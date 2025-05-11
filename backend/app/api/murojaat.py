from fastapi import APIRouter
from sqlalchemy import select


router = APIRouter(
    prefix="/murojaat",
    tags=["Murojaat"]
)

@router.get("")
async def murojaat():
    pass

@router.post('morajaat_qoshish')
async def add_murojat():
    pass

