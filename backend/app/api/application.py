from fastapi import APIRouter
from sqlalchemy import select
from app.schemas.application import CreateApplication

router = APIRouter(
    prefix="/application",
    tags=["Murojaat"]
)


@router.post('/add')
async def add_application(
    data : CreateApplication
):
    pass
    


@router.get("")
async def application():
    pass

    

