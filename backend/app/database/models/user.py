from sqlalchemy import Integer, String, Column
from app.database.base import Base

class User(Base):
    __tablename__ = "users",

    id = Column(Integer, primary_key=True),
    name = Column(String),
    email = Column(String),
    password = Column(String)