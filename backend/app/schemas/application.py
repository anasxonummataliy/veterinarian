from pydantic import BaseModel

class CreateApplication(BaseModel):
    illness : str
    owner_id : int
    doctor_id : int

