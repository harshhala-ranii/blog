# Docker Deployment Guide

This guide explains how to deploy the blog using pre-built Docker images, which is ideal for resource-constrained machines.

## Workflow Overview

1. **Build locally** - Build the Docker image on a development machine
2. **Push to registry** - Push the image to a Docker registry (Docker Hub, private registry, etc.)
3. **Deploy remotely** - Pull and run the pre-built image on the target machine

## Prerequisites

- Docker installed on both development and target machines
- Access to a Docker registry (Docker Hub, AWS ECR, Google GCR, etc.)
- Docker registry credentials configured

## Step 1: Configure Your Registry

### Update docker-compose.yml

Edit `docker-compose.yml` and replace the placeholder image name:

```yaml
blog:
  image: your-registry/blog-app:latest  # Replace with your actual registry and image name
```

Examples:
- Docker Hub: `/blog-app:latest`
- AWS ECR: `123456789012.dkr.ecr.us-east-1.amazonaws.com/blog-app:latest`
- Google GCR: `gcr.io/your-project/blog-app:latest`

### Update Build Script

Edit `scripts/build-and-push.sh` and update the configuration:

```bash
REGISTRY="your-registry"  # e.g., "yourusername" for Docker Hub
IMAGE_NAME="blog-app"
TAG="latest"
```

## Step 2: Build and Push (Development Machine)

1. **Login to your registry:**
   ```bash
   # For Docker Hub
   docker login
   
   # For private registries
   docker login your-registry.com
   ```

2. **Build and push the image:**
   ```bash
   ./scripts/build-and-push.sh
   ```

   This script will:
   - Build the Docker image locally
   - Tag it with your registry information
   - Push it to the registry

## Step 3: Deploy (Target Machine)

1. **Copy deployment files to target machine:**
   ```bash
   # Copy these files to your target machine:
   - docker-compose.yml
   - scripts/docker-setup.sh
   - content/ (directory)
   - public/images/ (directory)
   ```

2. **Run the deployment:**
   ```bash
   ./scripts/docker-setup.sh
   ```

   This script will:
   - Pull the latest pre-built image
   - Start PostgreSQL database
   - Wait for database to be ready
   - Start the blog application
   - Run database migrations

## Updating the Application

When you make changes to your blog:

1. **On development machine:**
   ```bash
   ./scripts/build-and-push.sh
   ```

2. **On target machine:**
   ```bash
   ./scripts/docker-setup.sh
   ```

## Registry Options

### Docker Hub (Free)
- Registry: `yourusername/blog-app:latest`
- Login: `docker login`

### AWS ECR
- Registry: `123456789012.dkr.ecr.us-east-1.amazonaws.com/blog-app:latest`
- Login: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com`

### Google Container Registry
- Registry: `gcr.io/your-project/blog-app:latest`
- Login: `gcloud auth configure-docker`

## Troubleshooting

### Image Pull Failed
- Check if you're logged in to the registry
- Verify the image name and tag are correct
- Ensure the image was pushed successfully

### Build Failed
- Check if Docker is running
- Verify Dockerfile syntax
- Check for sufficient disk space

### Database Connection Issues
- Ensure PostgreSQL container is healthy
- Check database credentials in docker-compose.yml
- Verify network connectivity between containers

## Useful Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Restart blog service
docker-compose restart blog

# Update content (restart blog to pick up changes)
docker-compose restart blog
```

## Access URLs

After successful deployment:
- **Blog**: http://localhost:3035
- **pgAdmin**: http://localhost:5050 (admin@blog.com / admin123)
- **Database**: Internal only (accessed via pgAdmin)
