# Blogs Content Directory

This directory contains all blog posts for the personal blog section. Each blog post should be a Markdown file with frontmatter.

## File Structure

```
content/blogs/
├── README.md (this file)
├── my-first-blog-post.md
├── learning-to-cook-during-lockdown.md
├── thoughts-on-social-media.md
└── [your-blog-post].md
```

## Frontmatter Format

Each blog post file must start with frontmatter in this exact format:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
description: "A brief description of your blog post"
image: "/images/your-image.jpg"
---
```

### Required Fields

- **`title`**: The main title that appears on the card and page
- **`date`**: Publication date in YYYY-MM-DD format
- **`description`**: Short summary used in cards and meta descriptions
- **`image`**: Path to featured image (should be in `/public/images/`)

## Adding New Blog Posts

1. Create a new `.md` file in this directory
2. Add the required frontmatter
3. Write your blog post content in Markdown
4. Add your featured image to `/public/images/`
5. The blog post will automatically appear on the blogs page

## Content Guidelines

Blog posts should be personal, authentic, and engaging. Consider writing about:

- **Personal experiences** and life lessons
- **Reflections** on current events or trends
- **Stories** from your daily life
- **Thoughts** on topics you're passionate about
- **Challenges** you've faced and overcome
- **Ideas** and insights you want to share

## Markdown Features

You can use all standard Markdown features:

- **Headers** (# ## ###)
- **Bold** and *italic* text
- **Lists** (ordered and unordered)
- **Links** [text](url)
- **Images** ![alt](url)
- **Code blocks** and `inline code`
- **Blockquotes** (> text)
- **Tables**
- **Horizontal rules** (---)

## Example

See `my-first-blog-post.md` for a complete example of a blog post.

## Images

- Place all images in `/public/images/`
- Use descriptive filenames
- Recommended size for featured images: 1200x630px
- Supported formats: JPG, PNG, WebP

## File Naming

- Use lowercase letters and hyphens
- No spaces or special characters
- Must end with `.md`
- Examples: `my-awesome-post.md`, `life-lessons-2024.md`
