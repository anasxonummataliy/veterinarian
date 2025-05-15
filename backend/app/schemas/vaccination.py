from pydantic import BaseModel

class CreateVaccination(BaseModel):
    vaccination_type : str
    vaccination_status : str
    