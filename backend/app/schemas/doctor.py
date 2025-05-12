from pydantic import BaseModel

class Doctor(BaseModel):
    name : str 
    doctor_type : str 