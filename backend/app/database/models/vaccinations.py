from sqlalchemy import Integer, String, Column, ForeignKey
from app.database.base import Base

class Vaccination(Base):
    __tablename__ = 'vaccination'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String)
    status = Column(String)

    