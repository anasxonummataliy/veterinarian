from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import create_db_and_tables
from app.api.auth import router as auth_router
from app.api.notification import router as notification
from app.api.vaccination import router as voccation
from app.api.application import router as application
from app.api.doctors import router as doctors
from app.database import models


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield


app = FastAPI(
    title="Auth API",
    description="Auth API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(notification)
app.include_router(voccation)
app.include_router(application)
app.include_router(doctors)


@app.get("/")
async def start():
    return {"message": "Ishlayapti Docs : http://127.0.0.1:8000/docs"}
