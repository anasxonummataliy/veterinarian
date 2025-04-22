from fastapi import APIRouter
from sqlalchemy import select




router = APIRouter(
    prefix="/murojaat",
    tags=["Murojaat"]
)