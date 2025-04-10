from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan( app : FastAPI):

    yield



app = FastAPI(
    title="Auth API",
    description="Auth API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_crdients = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)