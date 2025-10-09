# Blog Highlighting System

## Overview
The blog system now supports highlighted text that appears with special styling - italicized and with a subtle yellow background and border.

## Syntax
To highlight text in your blog posts, wrap the text with the following syntax:

```markdown
>!Your highlighted text here!<
```

## Examples

### Basic Highlight
```markdown
This is a normal sentence with >!some highlighted text!< in the middle.
```

### Full Sentence Highlight
```markdown
>!This entire sentence will be highlighted!< and this part won't be.
```

### Multiple Highlights
```markdown
>!First highlight!< and then >!second highlight!< in the same paragraph.
```

## Visual Design
Highlighted text features:
- **Italic styling** for emphasis
- **Yellow background** with transparency (`bg-yellow-400/20`)
- **Left border** in yellow (`border-yellow-400/60`)
- **Subtle padding** for better readability
- **Hover effects** that slightly intensify the colors
- **Smooth transitions** for a polished feel

## Technical Implementation
1. **Markdown Processing**: The `>!text!<` syntax is converted to HTML placeholders during markdown processing
2. **React Components**: The `BlogContent` component splits the HTML and renders highlighted sections with the `Highlight` component
3. **Styling**: Uses Tailwind CSS classes for consistent, responsive design

## Usage Tips
- Use highlights sparingly for maximum impact
- Highlight key insights, important quotes, or emotional moments
- Keep highlighted text concise - full paragraphs work but shorter phrases are more effective
- Consider the reading flow when placing highlights

## Files Modified
- `src/components/Highlight.tsx` - The highlight component
- `src/components/BlogContent.tsx` - Processes and renders content with highlights
- `src/lib/blog-markdown.ts` - Converts highlight syntax to HTML placeholders
- `src/app/blogs/[slug]/page.tsx` - Uses the new BlogContent component

## Example in Action
Check out the "Thoughts on Social Media" blog post to see the highlighting system in action with real examples!
