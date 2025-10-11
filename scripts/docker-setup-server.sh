#!/bin/bash

# Docker Setup Script for Blog (Server Version)
# This script handles Docker permissions and pulls the pre-built Docker image

echo "🐳 Starting Blog with Docker Compose on Server..."

# Check if Docker is accessible
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker permission denied. Trying with sudo..."
    
    # Use sudo for all Docker commands
    SUDO_CMD="sudo"
else
    echo "✅ Docker accessible without sudo"
    SUDO_CMD=""
fi

# Stop any existing containers
$SUDO_CMD docker-compose down

# Pull the latest pre-built image
echo "📥 Pulling latest blog image..."
$SUDO_CMD docker-compose pull blog

# Start the services
$SUDO_CMD docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database is ready
until $SUDO_CMD docker exec blog-postgres pg_isready -U blog_user -d blog_db; do
  echo "Waiting for database..."
  sleep 2
done

echo "✅ Database is ready!"

# Start the blog application
$SUDO_CMD docker-compose up -d blog

# Wait a moment for the app to start
sleep 5

# Run database migrations
echo "📊 Running database migrations..."
$SUDO_CMD docker exec blog-app npx prisma migrate deploy

echo "🎉 Blog is now running!"
echo ""
echo "📊 Access your services:"
echo "   - Blog: http://localhost:3035"
echo "   - Database: Internal only (accessed via pgAdmin)"
echo "   - pgAdmin: http://localhost:5050 (admin@blog.com / admin123)"
echo ""
echo "📝 Useful commands:"
echo "   - View logs: $SUDO_CMD docker-compose logs -f"
echo "   - Stop: $SUDO_CMD docker-compose down"
echo "   - Restart: $SUDO_CMD docker-compose restart"
echo "   - Update content: $SUDO_CMD docker-compose restart blog"
