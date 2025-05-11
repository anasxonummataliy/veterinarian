from fastapi import APIRouter


router = APIRouter(
    prefix="/bildirishnoma",
    tags=['Bildirishnoma']
)



@router.get("/bildirishnoma/")
async def get_notification():
  pass  

