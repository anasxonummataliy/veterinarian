from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


from app.database.session import get_db
from app.database.models.notifications import Notification
from app.schemas.notification import CreateNotification

router = APIRouter(
    prefix="/notification",
    tags=['Notification']
)


@router.post('/add')
async def add_notification(data : CreateNotification, db : AsyncSession = Depends(get_db)):
    try:
      new_notification = Notification(**data.model_dump())
      db.add(new_notification)
      db.commit
      return new_notification
    except Exception as e:
       raise HTTPException(detail=f"Ma'lumot saqlashda xatolik : {e}", status_code=500)


@router.get("/")
async def get_notification(db: AsyncSession = Depends(get_db)):
  smtm = select(Notification)
  result = await db.execute(smtm)
  notification = result.scalars().all()
  return notification

