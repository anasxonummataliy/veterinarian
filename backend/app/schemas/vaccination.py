from pydantic import BaseModel

class CreateVaccination(BaseModel):
    type : str
    status : str
    