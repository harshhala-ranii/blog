# Database Setup Guide

This blog now uses PostgreSQL with Docker for storing like/dislike data. Here's how to set it up:

## 🐳 Quick Start

### 1. Set up the Database
```bash
# Run the setup script (creates database, runs migrations)
npm run db:setup
```

### 2. Start Development
```bash
# Start the app
npm run dev
```

## 📊 Database Commands

```bash
# Start database only
npm run db:start

# Stop database
npm run db:stop

# Reset database (removes all data)
npm run db:reset

# Run new migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Open Prisma Studio (database GUI)
npm run db:studio
```

## 🔧 Manual Setup

If you prefer to set up manually:

### 1. Start PostgreSQL
```bash
docker-compose up -d postgres
```

### 2. Wait for Database
```bash
# Check if database is ready
docker exec blog-postgres pg_isready -U blog_user -d blog_db
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

## 🌐 Access Points

- **Database**: `postgresql://blog_user:blog_password@localhost:5432/blog_db`
- **pgAdmin**: http://localhost:5050
  - Email: `admin@blog.com`
  - Password: `admin123`

## 📁 Database Schema

The `blog_likes` table stores like/dislike data:

```sql
CREATE TABLE blog_likes (
  id         TEXT PRIMARY KEY,
  slug       TEXT UNIQUE NOT NULL,
  likes      INTEGER DEFAULT 0,
  dislikes   INTEGER DEFAULT 0,
  totalVotes INTEGER DEFAULT 0,
  createdAt  TIMESTAMP DEFAULT NOW(),
  updatedAt  TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Production Deployment

For production, you'll need to:

1. **Set environment variables**:
   ```bash
   DATABASE_URL="your-production-database-url"
   ```

2. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Generate client**:
   ```bash
   npx prisma generate
   ```

## 🔍 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs blog-postgres

# Restart database
npm run db:stop
npm run db:start
```

### Migration Issues
```bash
# Reset and recreate
npm run db:reset
npm run db:setup
```

### Prisma Issues
```bash
# Regenerate client
npm run db:generate

# Check schema
npx prisma validate
```

## 🎯 Features

- ✅ **Persistent storage** - Data survives deployments
- ✅ **Real-time updates** - Like/dislike counts update instantly
- ✅ **Scalable** - Can handle thousands of votes
- ✅ **Production ready** - Works with any PostgreSQL provider
- ✅ **Easy management** - Docker + Prisma for simple setup

Your like/dislike system is now powered by a real database! 🎉
