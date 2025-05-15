from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from app.core.security.jwt import decode_jwt_token
from app.database.session import get_db
from app.schemas.application import CreateApplication
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models.application import Application

router = APIRouter(
    prefix="/application",
    tags=["Application"]
)


@router.post('/add')
async def add_application(
    request: Request,
    data: CreateApplication,
    db: AsyncSession = Depends(get_db)
):
    if not request.headers.get("Authorization"):
        raise HTTPException(status_code=401, detail="Ro'yxatdan o'tmagansiz")
    token = request.headers.get("Authorization").split(" ")
    if len(token) != 2:
        raise HTTPException(detail="")
    user_id = decode_jwt_token(token[1])

    new_application = Application(**data.model_dump(), owner_id=user_id)
    db.add(new_application)
    await db.commit()
    return new_application


@router.get("/")
async def application(
    db: AsyncSession = Depends(get_db)
):
    try:
        stmt = select(Application)
        result = await db.execute(stmt)
        return result.scalars().all()

    except Exception as e:
        raise HTTPException(
            detail=f"Ma'lumot olishda xatolik {e}", status_code=500)
