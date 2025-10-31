import { db } from './db';

export interface LikeData {
  likes: number;
  dislikes: number;
  totalVotes: number;
}

function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function getBlogLikes(slug: string): Promise<LikeData> {
  // Short-circuit if database isn't configured/running
  if (!isDbConfigured()) {
    return { likes: 0, dislikes: 0, totalVotes: 0 };
  }
  try {
    const blogLike = await db.blogLike.findUnique({
      where: { slug },
    });

    if (!blogLike) {
      // Create initial record if it doesn't exist
      const newBlogLike = await db.blogLike.create({
        data: {
          slug,
          likes: 0,
          dislikes: 0,
          totalVotes: 0,
        },
      });
      return {
        likes: newBlogLike.likes,
        dislikes: newBlogLike.dislikes,
        totalVotes: newBlogLike.totalVotes,
      };
    }

    return {
      likes: blogLike.likes,
      dislikes: blogLike.dislikes,
      totalVotes: blogLike.totalVotes,
    };
  } catch (error) {
    console.error('Error reading likes from database:', error);
    return { likes: 0, dislikes: 0, totalVotes: 0 };
  }
}

export async function updateBlogLikes(slug: string, type: 'like' | 'dislike'): Promise<LikeData> {
  // Short-circuit if database isn't configured/running
  if (!isDbConfigured()) {
    return { likes: 0, dislikes: 0, totalVotes: 0 };
  }
  try {
    // Use upsert to create or update the record
    const blogLike = await db.blogLike.upsert({
      where: { slug },
      update: {
        likes: type === 'like' ? { increment: 1 } : undefined,
        dislikes: type === 'dislike' ? { increment: 1 } : undefined,
        totalVotes: { increment: 1 },
      },
      create: {
        slug,
        likes: type === 'like' ? 1 : 0,
        dislikes: type === 'dislike' ? 1 : 0,
        totalVotes: 1,
      },
    });

    return {
      likes: blogLike.likes,
      dislikes: blogLike.dislikes,
      totalVotes: blogLike.totalVotes,
    };
  } catch (error) {
    console.error('Error updating likes in database:', error);
    return { likes: 0, dislikes: 0, totalVotes: 0 };
  }
}
