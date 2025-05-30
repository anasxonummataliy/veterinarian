from sqlalchemy import Integer, Column, String
from app.database.base import Base


class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    doctor_type = Column(String)
