from fastapi import APIRouter


router = APIRouter(
    prefix="/emlash",
    tags=['Emlash']
)

@router.get("")
async def emlash():
    pass