from datetime import datetime
from sqlalchemy import ForeignKey, Integer, Column, String, DateTime
from app.database.base import Base


class Notification(Base):
    __tablename__ = 'notification'

    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey('users.id'))
    type = Column(String)
    message = Column(String)
    date = Column(DateTime)
