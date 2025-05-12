from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from argon2.exceptions import VerificationError
from fastapi import APIRouter, Depends, HTTPException, Header
from fastapi.responses import JSONResponse

from app.core.logger import logger
from app.core.security.jwt import create_jwt_token, decode_jwt_token
from app.database.session import get_db
from app.database.models.user import User
from app.core.utils import hash_password, verify_password
from app.schemas.for_auth import RegisRequest, LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register/")
async def registration(
    user_in: RegisRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        smtm = select(User).where(User.email == user_in.email)
        result = await db.execute(smtm)
        db_user = result.scalar_one_or_none()

        if db_user is not None:
            raise HTTPException(
                detail="Bu email allaqachon ro'yhatdan o'tgan.", status_code=400
            )

        user_in.password = hash_password(user_in.password)
        new_user = User(**user_in.model_dump())

        db.add(new_user)
        await db.commit()
        return JSONResponse(content={"message": "Siz muvafaqiyatli ro'yxatdan o'tdingiz"})
    except VerificationError as e:
        raise HTTPException(detail=f"Password error: {e}", status_code=500)


@router.post('/login/')
async def login(
        request: LoginRequest,
        db: AsyncSession = Depends(get_db)
):
    try:
        stmt = select(User).where(User.email == request.email)
        result = await db.execute(stmt)
        user = result.scalar_one_or_none()

        if not user:
            logger.warning("Bunday foydalanuvchi mavjud emas.")
            raise HTTPException(
                status_code=404, detail="Bunday foydalanuvchi mavjud emas."
            )
        if verify_password(user.password, request.password):
            logger.info("Kirish muvafaqiyatli amalga oshirildi.")
            token = create_jwt_token(user.id)
            return JSONResponse(content={"message": "", "token": token})
        return JSONResponse(content={"message": "Ma'lumotlar xato"})
    except VerificationError as e:
        logger.warning(f"Password error: {e}")
        return HTTPException(detail="Parol xato", status_code=500)
    except Exception as e:
        logger.error("Parolni tekshirish imkoni bo'lmadi.")
        raise HTTPException(detail=f"Server error: {e}", status_code=500)


@router.get("/me")
async def get_me(
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token format noto‘g‘ri")

    token = authorization.split(" ")[1]
    user_id = decode_jwt_token(token)

    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    db_user = result.scalar_one_or_none()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")

    return {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email
    }
