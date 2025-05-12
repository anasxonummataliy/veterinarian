from fastapi import APIRouter


router = APIRouter(
    prefix="/bildirishnoma",
    tags=['Bildirishnoma']
)



@router.get("/")
async def get_notification():
  pass  

