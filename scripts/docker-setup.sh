#!/bin/bash

echo "🐳 Starting Blog with Docker Compose..."

# Stop any existing containers
docker-compose down

# Remove old images to ensure fresh build
docker-compose build --no-cache

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
echo "   - Blog: http://localhost:3000"
echo "   - Database: postgresql://blog_user:blog_password@localhost:5432/blog_db"
echo "   - pgAdmin: http://localhost:5050 (admin@blog.com / admin123)"
echo ""
echo "📝 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop: docker-compose down"
echo "   - Restart: docker-compose restart"
echo "   - Update content: docker-compose restart blog"
