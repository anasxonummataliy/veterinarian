from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from app.schemas.doctor import CreateDoctor
from app.database.models import Doctor 
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db


router = APIRouter(
    prefix='/doctor',
    tags=["Doctors"]
)


@router.post('/add')
async def add_doctor(
    data: CreateDoctor,
    db: AsyncSession = Depends(get_db)
):
    try:
        new_doctor = Doctor(**data.model_dump())
        db.add(new_doctor)
        await db.commit()
        return new_doctor
    except Exception as e:
        raise HTTPException(
            detail=f"Ma'lumot saqlashda xatolik {e}", status_code=500)


@router.get("/{doctor_id}")
async def get_doctor(
    doctor_id : int,
    db : AsyncSession = Depends(get_db)
):
    try:
        stmt = select(Doctor).where(Doctor.id == doctor_id)
        result = await db.execute(stmt)
        doctor = result.scalar_one_or_none()

        if doctor is None:
            raise HTTPException(status_code=404, detail="Doktor topilmadi")
        return {'name' : doctor.name}

    except Exception as e:
        raise HTTPException(
            detail=f"Ma'lumot olishda xatolik {e}", status_code=500)
