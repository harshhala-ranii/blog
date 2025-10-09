# Reviews Content Directory

This directory contains all review posts for the blog. Each review should be a Markdown file with frontmatter.

## File Structure

```
content/reviews/
├── README.md (this file)
├── example-review.md
├── coffee-shop-review.md
└── [your-review].md
```

## Frontmatter Format

Each review file must start with frontmatter in this exact format:

```yaml
---
title: "Your Review Title"
date: "YYYY-MM-DD"
description: "A short description of your review"
image: "/images/your-image.jpg"
---
```

### Required Fields

- **title**: The main title of your review
- **date**: Publication date in YYYY-MM-DD format
- **description**: A brief summary (used in cards and meta descriptions)
- **image**: Path to the featured image (should be in `/public/images/`)

## Adding New Reviews

1. Create a new `.md` file in this directory
2. Add the required frontmatter
3. Write your review content in Markdown
4. Add your featured image to `/public/images/`
5. The review will automatically appear on the reviews page

## Markdown Features

You can use standard Markdown features:

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

See `example-review.md` for a complete example of a review post.

## Images

- Place all images in `/public/images/`
- Use descriptive filenames
- Recommended size for featured images: 1200x630px
- Supported formats: JPG, PNG, WebP
