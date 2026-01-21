#!/bin/bash

set -e

APP_NAME="cw-frontend"
PORT=5173

echo "Stopping and removing existing container (if any)..."
docker rm -f $APP_NAME || true

echo "Removing old image (if any)..."
docker rmi -f $APP_NAME || true

echo "Building Docker image..."
docker build --no-cache -t $APP_NAME .

echo "Running container..."
docker run -d \
  --name $APP_NAME \
  -p $PORT:5173 \
  $APP_NAME

echo "Deployment complete."
echo "App running at http://localhost:$PORT"
