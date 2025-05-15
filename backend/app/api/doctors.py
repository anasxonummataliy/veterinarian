from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from app.core.security.jwt import decode_jwt_token
from app.schemas.doctor import CreateDoctor
from app.schemas.vaccination import CreateVaccination
from app.database.models.doctor import Doctor 
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models.vaccinations import Vaccination

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

@router.get("/")
async def get_all_doctor(db:AsyncSession=Depends(get_db)):
    stmt = select(Doctor)
    result = await db.execute(stmt)
    doctor = result.scalars().all()
    return doctor

@router.get("/{doctor_id}")
async def get_doctor_id(
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


@router.post('/add_vaccination')
async def add_vaccination(
    request : Request,
    data : CreateVaccination,
    db : AsyncSession = Depends(get_db)
):
    try:
        token = request.headers.get("Authorization").split(" ")
        if len(token) != 2:
            raise HTTPException(detail="")
        user_id = decode_jwt_token(token[1])

        new_vaccination = Vaccination(**data.model_dump(), user_id = user_id)
        db.add(new_vaccination)
        await db.commit()
        return new_vaccination

    except Exception as e :
        raise HTTPException(
            detail=f"Ma'lumot qo'shishda xatolik : {e}", status_code=500
        )