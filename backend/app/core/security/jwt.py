import jwt
from app.core.config import settings


def create_jwt_token(user_id: int) -> str:
    to_payload = {"id": user_id}
    token = jwt.encode(to_payload, settings.jwt_secret, algorithm="HS256")
    return token


def decode_jwt_token(token: str) -> int:
    payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
    return payload["id"]
