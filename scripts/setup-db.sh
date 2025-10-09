#!/bin/bash

echo "🐳 Starting PostgreSQL database with Docker..."

# Start the database
docker-compose up -d postgres

echo "⏳ Waiting for database to be ready..."

# Wait for database to be ready
until docker exec blog-postgres pg_isready -U blog_user -d blog_db; do
  echo "Waiting for database..."
  sleep 2
done

echo "✅ Database is ready!"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "📊 Running database migrations..."
npx prisma migrate dev --name init

echo "🎉 Database setup complete!"
echo ""
echo "📊 Access your database:"
echo "   - Database: postgresql://blog_user:blog_password@localhost:5432/blog_db"
echo "   - pgAdmin: http://localhost:5050 (admin@blog.com / admin123)"
echo ""
echo "🚀 Start your Next.js app with: npm run dev"
