from sqlalchemy.orm import DeclarativeBase

from app.database.session import async_engine
class Base(DeclarativeBase):
    pass

async def create_db_and_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)