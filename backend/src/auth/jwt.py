"""
JWT verification utilities for authenticating Better Auth tokens.

This module provides functions to verify JWT tokens issued by Better Auth
and extract user identity information from the token payload.
"""

import os
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from fastapi import HTTPException, status, Request
from dotenv import load_dotenv

load_dotenv()

# JWT Configuration from environment
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM", "HS256")

# Validate configuration
if not SECRET_KEY:
    raise ValueError(
        "JWT_SECRET_KEY environment variable is not set. "
        "Please configure your .env file with the shared secret."
    )


def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verify and decode a JWT token using the shared secret.

    Args:
        token: The JWT token string (without 'Bearer ' prefix)

    Returns:
        Dict containing the decoded payload if valid, None otherwise

    Raises:
        HTTPException: If token is invalid, expired, or malformed
    """
    try:
        # Decode and verify the token
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    except jwt.JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def extract_bearer_token(request: Request) -> str:
    """
    Extract the Bearer token from the Authorization header.

    Args:
        request: FastAPI request object

    Returns:
        The token string without 'Bearer ' prefix

    Raises:
        HTTPException: If Authorization header is missing or malformed
    """
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format. Expected: 'Bearer <token>'",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Extract token (remove 'Bearer ' prefix)
    token = auth_header[7:].strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is empty",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return token


def get_user_from_token(token: str) -> Dict[str, Any]:
    """
    Verify token and extract user identity.

    Args:
        token: The JWT token string

    Returns:
        Dict containing user_id and email from the token payload

    Raises:
        HTTPException: If token is invalid or required claims are missing
    """
    # Verify token
    payload = verify_jwt_token(token)

    # Extract required claims
    user_id = payload.get("sub")
    email = payload.get("email")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing required 'sub' claim (user ID)",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing required 'email' claim",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Return user identity
    return {
        "user_id": user_id,
        "email": email,
    }
