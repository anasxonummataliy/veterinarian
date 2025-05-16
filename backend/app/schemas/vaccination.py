from datetime import datetime
from pydantic import BaseModel

class CreateVaccination(BaseModel):
    type : str
    status : str
    date : datetime
    