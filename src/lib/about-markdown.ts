import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const aboutDirectory = path.join(process.cwd(), 'content');

export function getAboutData() {
  const fullPath = path.join(aboutDirectory, 'about.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Preprocess content to handle highlighting
  let content = matterResult.content;
  
  // Replace highlight syntax with placeholder spans
  content = content.replace(/>!highlight!<(.*?)>/g, '<span class="highlight-placeholder">$1</span>');

  // Use remark to convert markdown into HTML string
  const processedContent = remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(content);
  
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    image: matterResult.data.image,
    contentHtml,
  };
}
