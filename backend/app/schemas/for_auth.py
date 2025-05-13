from pydantic import BaseModel, EmailStr


class RegisRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str



class UserResponse(BaseModel):
    id:int
    name:str
    email: EmailStr

