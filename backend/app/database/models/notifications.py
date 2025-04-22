from sqlalchemy import Integer, Column, String
from app.database.base import Base

class Notification(Base):
    __tablename__ = 'notification'

    id = Column(Integer, primary_key=True)
    user_id = Column()
    type = Column(String)
    message = Column(String)
    sent_at = Column()