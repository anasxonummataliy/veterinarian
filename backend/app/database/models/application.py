from sqlalchemy import Integer, String, ForeignKey, Column, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.base import Base


class Application(Base):
    __tablename__ = "application"
    id = Column(Integer, primary_key=True, index=True)
    illness = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow())
    owner_id = Column(ForeignKey("users.id"))
    doctor_id = Column(ForeignKey("doctors.id"))

    owner = relationship("User", back_populates="applications")
