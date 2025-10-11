#!/bin/bash

# Build and Push Script for Blog Docker Image
# This script builds the Docker image locally and pushes it to a registry

set -e  # Exit on any error

# Configuration - GitHub Container Registry (GHCR)
REGISTRY="ghcr.io/harshhala-ranii" 
IMAGE_NAME="blog-app"
TAG="latest"

# Full image name
FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"

echo "🏗️  Building and pushing Docker image: ${FULL_IMAGE_NAME}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build the image
echo "🔨 Building Docker image..."
docker build -t "${FULL_IMAGE_NAME}" .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
else
    echo "❌ Docker build failed!"
    exit 1
fi

# Push the image
echo "📤 Pushing image to registry..."
docker push "${FULL_IMAGE_NAME}"

if [ $? -eq 0 ]; then
    echo "✅ Docker image pushed successfully!"
    echo ""
    echo "🎉 Image is now available at: ${FULL_IMAGE_NAME}"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update docker-compose.yml with your image name: ${FULL_IMAGE_NAME}"
    echo "   2. Run the deployment script on your target machine"
    echo ""
else
    echo "❌ Docker push failed!"
    echo ""
    echo "💡 Make sure you're logged in to GitHub Container Registry:"
    echo "   - Create a Personal Access Token (PAT) with 'write:packages' scope"
    echo "   - Login: echo \$GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin"
    exit 1
fi

echo "🚀 Build and push completed successfully!"
