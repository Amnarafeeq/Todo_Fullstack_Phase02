"""
JWT Authentication Middleware for FastAPI.

This module provides FastAPI dependencies for protecting routes with JWT authentication.
It verifies the token from the Authorization header and attaches user info to request state.
"""

from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, status, Request
from pydantic import BaseModel

from auth.jwt import extract_bearer_token, get_user_from_token


class AuthenticatedUser(BaseModel):
    """
    Model representing an authenticated user extracted from JWT token.
    """
    user_id: str
    email: str

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "123",
                "email": "user@example.com"
            }
        }


async def get_current_user(request: Request) -> AuthenticatedUser:
    """
    FastAPI dependency that validates JWT and extracts user identity.

    This function:
    1. Extracts the Bearer token from the Authorization header
    2. Verifies the JWT signature using the shared secret
    3. Decodes user_id and email from the token payload
    4. Returns an AuthenticatedUser object

    Usage:
        @app.get("/api/protected")
        async def protected_route(
            current_user: AuthenticatedUser = Depends(get_current_user)
        ):
            return {"message": f"Hello {current_user.email}"}

    Returns:
        AuthenticatedUser: User object containing user_id and email

    Raises:
        HTTPException (401): If token is missing, invalid, or expired
    """
    # Extract Bearer token from Authorization header
    token = extract_bearer_token(request)

    # Verify token and extract user identity
    user_data = get_user_from_token(token)

    # Return authenticated user object
    return AuthenticatedUser(
        user_id=user_data["user_id"],
        email=user_data["email"]
    )


async def optional_auth(request: Request) -> Optional[AuthenticatedUser]:
    """
    Optional authentication dependency that returns user if token is valid,
    but doesn't raise an error if token is missing.

    Usage:
        @app.get("/api/public-or-private")
        async def route(
            current_user: Optional[AuthenticatedUser] = Depends(optional_auth)
        ):
            if current_user:
                return {"message": f"Hello {current_user.email}"}
            return {"message": "Hello anonymous user"}

    Returns:
        Optional[AuthenticatedUser]: User object if token valid, None otherwise
    """
    try:
        return await get_current_user(request)
    except HTTPException as e:
        # Only skip error for missing auth header, not for invalid tokens
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None
        # Re-raise if token is present but invalid
        raise


async def get_current_user_id(request: Request) -> str:
    """
    Convenience dependency that returns only the user_id string.

    Useful when you only need the user ID for database queries.

    Usage:
        @app.get("/api/{user_id}/tasks")
        async def get_tasks(
            user_id: str,
            current_user_id: str = Depends(get_current_user_id)
        ):
            # Validate user_id matches current_user_id
            if user_id != current_user_id:
                raise HTTPException(403, "Forbidden")
            # ... fetch tasks ...

    Returns:
        str: The user ID from the JWT token

    Raises:
        HTTPException (401): If token is missing, invalid, or expired
    """
    user: AuthenticatedUser = await get_current_user(request)
    return user.user_id
