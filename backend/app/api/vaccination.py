from fastapi import APIRouter



router = APIRouter(
    prefix="/vaccination",
    tags=['Vaccination']
)

@router.get("")
async def emlash():
    pass