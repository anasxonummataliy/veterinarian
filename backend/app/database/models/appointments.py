import datetime
from sqlalchemy import Integer, String, Column
from app.database.base import Base


class Appointment(Base):
    __tablename__ = 'appointment'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    doctor = Column(String)
    disease = Column(String)
    date = Column(datetime)