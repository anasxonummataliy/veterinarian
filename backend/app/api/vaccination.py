from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.database.models.vaccinations import Vaccination


router = APIRouter(
    prefix="/vaccination",
    tags=['Vaccination']
)

@router.get("/")
async def vaccination(
    db : AsyncSession = Depends(get_db)
):
    try:
        stmt = select(Vaccination)
        result = await db.execute(stmt)
        vaccination = result.scalars().all()
        return vaccination
    except Exception as e :
        raise HTTPException(detail=f"Ma'lumot uzatishda xatolik : {e}", status_code=500)