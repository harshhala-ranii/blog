import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const reviewsDirectory = path.join(process.cwd(), 'content/reviews');

export interface ReviewPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category?: string;
  content: string;
  contentHtml: string;
}

export function getSortedReviewsData(): Omit<ReviewPost, 'content' | 'contentHtml'>[] {
  // Get file names under /content/reviews
  const fileNames = fs.readdirSync(reviewsDirectory);
  const allReviewsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(reviewsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
      } as Omit<ReviewPost, 'content' | 'contentHtml'>;
    })
    .filter((review) => review.title && review.date && review.description && review.image); // Filter out invalid reviews

  // Sort posts by date
  return allReviewsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllReviewSlugs(): string[] {
  const fileNames = fs.readdirSync(reviewsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getReviewData(slug: string): Promise<ReviewPost> {
  const fullPath = path.join(reviewsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug
  return {
    slug,
    content: matterResult.content,
    contentHtml,
    ...matterResult.data,
  } as ReviewPost;
}

export function getReviewSlugs(): string[] {
  const fileNames = fs.readdirSync(reviewsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

// Categories helpers
export function getReviewCategories(): string[] {
  const fileNames = fs.readdirSync(reviewsDirectory);
  const categories = new Set<string>();
  fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .forEach((fileName) => {
      const fullPath = path.join(reviewsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const category = (matterResult.data?.category as string) || 'Uncategorized';
      categories.add(category);
    });
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

export function getReviewsByCategory(): Record<string, Omit<ReviewPost, 'content' | 'contentHtml'>[]> {
  const reviews = getSortedReviewsData();
  return reviews.reduce<Record<string, Omit<ReviewPost, 'content' | 'contentHtml'>[]>>((acc, review) => {
    const category = review.category ?? 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(review);
    return acc;
  }, {});
}

export function getSortedReviewsDataByCategory(category: string): Omit<ReviewPost, 'content' | 'contentHtml'>[] {
  const normalized = category.toLowerCase();
  return getSortedReviewsData().filter((r) => {
    const c = r.category ?? 'Uncategorized';
    return c.toLowerCase() === normalized;
  });
}
