"""Password hashing utilities.

NOTE: We avoid passlib's bcrypt backend here because Windows/Python 3.13
frequently hits compatibility issues (e.g., 'bcrypt has no __about__').

We use PBKDF2-SHA256 via passlib, which is a secure, widely-supported
password hashing scheme and works reliably across platforms.
"""

from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto",
)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
