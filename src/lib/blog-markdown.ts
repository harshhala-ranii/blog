import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  content: string;
  contentHtml: string;
}

export function getSortedBlogsData(): Omit<BlogPost, 'content' | 'contentHtml'>[] {
  // Get file names under /content/blogs
  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
      } as Omit<BlogPost, 'content' | 'contentHtml'>;
    })
    .filter((blog) => blog.title && blog.date && blog.description && blog.image); // Filter out invalid blogs

  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getBlogData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Process highlights before markdown conversion
  let processedContent = matterResult.content;
  
  // Replace highlight syntax with HTML placeholders
  processedContent = processedContent.replace(
    />!highlight!<(.*?)>!highlight!</g, 
    '<span class="highlight-placeholder">$1</span>'
  );

  // Use remark to convert markdown into HTML string
  const htmlContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(processedContent);
  
  const contentHtml = htmlContent.toString();

  // Combine the data with the slug
  return {
    slug,
    content: matterResult.content,
    contentHtml,
    ...matterResult.data,
  } as BlogPost;
}

export function getBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName.toLowerCase() !== 'readme.md')
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
