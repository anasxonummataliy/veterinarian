from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
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
    data: CreateApplication,
    db: AsyncSession = Depends(get_db)
):
    try:
        new_application = Application(**data.model_dump())
        db.add(new_application)
        await db.commit()
        return new_application
    except Exception as e:
        raise HTTPException(
            detail=f"Ma'lumot qo'shishda xatolik {e}", status_code=500)


@router.get("/")
async def application(
    db : AsyncSession = Depends(get_db)
):
    try: 
        stmt = select(Application)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    except Exception as e :
        raise HTTPException(detail=f"Ma'lumot olishda xatolik {e}", status_code=500)