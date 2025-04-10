import logging
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError

from app.database.session import get_db
from app.database.models.user import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

ph = PasswordHasher()

class RegisRequest(BaseModel):
    name : str
    email : EmailStr
    password : str

class LoginRequest(BaseModel):
    email : EmailStr
    password : str

@router.post('/login')
async def login(request : LoginRequest,
                db : AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.email == request.email)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if not user:
        logger.warning(
            "Bunday foydalanuvchi mavjud emas."
        )
        raise HTTPException(
            status_code=404, detail="Bunday foydalanuvchi mavjud emas."
        )
    try:
        if ph.verify(user.password, request.password):
            logger.info("Kirish muvafaqiyatli amalga oshirildi.")
            return {
                "message": "Tizimga muvaffaqiyatli kirdingiz.",
                "user_id" : user.id,
                "name" : user.name
            }
    except VerificationError:
        logger.warning("Password xato kiritildi. Iltimos qayta kiriting.")
        raise HTTPException(status_code=401, detail="Parol xato")
    except Exception as e :
        logger.error("Parolni tekshirish imkoni bo'lmadi.")
        raise HTTPException(status_code=500, detail="Parolni tekshirib bo'lmadi.")
        