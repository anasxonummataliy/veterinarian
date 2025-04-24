from datetime import datetime, timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from argon2.exceptions import VerificationError
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

from app.core.logger import logger
from app.core.security import jwt
from app.core.security.jwt import create_jwt_token, decode_jwt_token
from app.database.session import get_db
from app.database.models.user import User
from app.core.utils import hash_password, verify_password
from app.schemas.for_auth import RegisRequest, LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


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

        access_token = create_access_token(data={"sub": new_user.email})

        return JSONResponse(content={
        "message": "Siz muvafaqiyatli ro'yxatdan o'tdingiz",
        "access_token": access_token
    })
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


@router.get("/me/{token}")
async def get_me(token: str, db: AsyncSession = Depends(get_db)):
    user_id = decode_jwt_token(token)
    smtm = select(User).where(User.id == user_id)
    result = await db.execute(smtm)
    db_user = result.scalar_one_or_none()
    return db_user
