from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from app.schemas.doctor import Doctor as doctor_schema
from app.database.models import Doctor as db_doctor
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db


router = APIRouter(
    prefix='/doctor',
    tags=["Doctors"]
)

@router.post('/add')
async def add_doctor(
    data : doctor_schema,
    db : AsyncSession = Depends(get_db)
):
    try:
        new_doctor = db_doctor(**data.model_dump())
        db.add(new_doctor)
        await db.commit()
        return new_doctor
    except Exception as e :
        raise HTTPException(detail=f"Ma'lumot saqlashda xatolik {e}", status_code=500)
