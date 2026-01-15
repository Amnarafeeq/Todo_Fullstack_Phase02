#!/bin/bash
# Production startup script for backend

# Check if environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL environment variable is not set"
    exit 1
fi

if [ -z "$JWT_SECRET_KEY" ]; then
    echo "ERROR: JWT_SECRET_KEY environment variable is not set"
    exit 1
fi

# Set environment to production
export ENVIRONMENT=production

# Start the application
echo "Starting Todo App backend in production mode..."
uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 4