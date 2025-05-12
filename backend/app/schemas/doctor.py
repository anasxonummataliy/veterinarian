from pydantic import BaseModel

class CreateDoctor(BaseModel):
    name : str 
    doctor_type : str 