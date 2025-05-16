import datetime
from pydantic import BaseModel


class CreateNotification(BaseModel):
    user_id : int
    type : str
    message : str
    date : datetime.datetime

