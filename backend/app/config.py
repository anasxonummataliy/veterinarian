from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_url : str = "sqlite+aioslite///./auth.db"

settings = Settings()