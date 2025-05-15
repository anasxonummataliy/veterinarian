from pydantic import BaseModel


class CreateNotification(BaseModel):
    type : str
    message : str

