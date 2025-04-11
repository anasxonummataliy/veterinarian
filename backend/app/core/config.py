from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_url: str = "sqlite+aiosqlite:///./main.db"

    jwt_secret: str = "rfkwfeklnq;lekjwrnfgeekjnrwf934089ghb3ipuelrfniw43ke"


settings = Settings()
