from pydantic import BaseModel

class CreateApplication(BaseModel):
    illness : str
    doctor_id : int

