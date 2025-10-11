#!/bin/bash

# Docker Setup Script for Blog
# This script pulls the pre-built Docker image and starts the services
# Make sure to build and push the image first using scripts/build-and-push.sh

echo "🐳 Starting Blog with Docker Compose..."

# Stop any existing containers
docker-compose down

# Pull the latest pre-built image
echo "📥 Pulling latest blog image..."
docker-compose pull blog

# Start the services
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database is ready
until docker exec blog-postgres pg_isready -U blog_user -d blog_db; do
  echo "Waiting for database..."
  sleep 2
done

echo "✅ Database is ready!"

# Start the blog application
docker-compose up -d blog

# Wait a moment for the app to start
sleep 5

# Run database migrations
echo "📊 Running database migrations..."
docker exec blog-app npx prisma migrate deploy

echo "🎉 Blog is now running!"
echo ""
echo "📊 Access your services:"
echo "   - Blog: http://localhost:3035"
echo "   - Database: Internal only (accessed via pgAdmin)"
echo "   - pgAdmin: http://localhost:5050 (admin@blog.com / admin123)"
echo ""
echo "📝 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop: docker-compose down"
echo "   - Restart: docker-compose restart"
echo "   - Update content: docker-compose restart blog"
