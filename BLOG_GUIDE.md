# 📝 PixelBoost Blog & Notion CMS Guide

Welcome to the **PixelBoost Blog Management System**! Your team can write and publish articles directly from **Notion** or directly in code.

---

# 🌟 Method 1: Writing Blogs in Notion (Recommended for Writers)

Your team can write articles in Notion using regular formatting (headings, bullet points, callouts, quotes, and images).

### 1. Database Columns Needed in Notion
Create or use your Notion Table/Database with these properties:

| Property Name | Type | Notes |
| :--- | :--- | :--- |
| **Title** | `Title` | The headline of the article |
| **Category** | `Select` | `Meta Ads`, `Video Production`, `Branding & Design`, `Growth Marketing` |
| **Excerpt** | `Text` | 1-2 sentence preview summary |
| **Date** | `Date` | Published date |
| **Author** | `Text` | Author name |
| **Cover** | `Files & media` or `URL` | Cover photo URL or file |
| **Published** | `Checkbox` | Check `✓` to make it go live |
| **Featured** | `Checkbox` | Check `✓` to highlight as the main top banner |
| **Tags** | `Multi-select` | E.g., `ROAS`, `Reels`, `Design` |

---

### 2. How to Sync Notion to Website
Whenever new articles are published in Notion, simply run:
```bash
npm run sync:notion
```
*This command automatically connects to Notion, fetches all published pages, downloads formatted content, and updates the website instantly!*

---

# 🛠️ Method 2: Adding Blogs in Code (`src/data/blogs.js`)

If writing directly in the repository, add a new block to `src/data/blogs.js`:

```javascript
{
  id: "your-article-slug",
  title: "Article Headline",
  excerpt: "1-2 sentence summary...",
  category: "Meta Ads",
  coverImage: "https://images.unsplash.com/photo-example",
  author: {
    name: "Author Name",
    role: "Role",
    avatar: "https://images.unsplash.com/photo-avatar"
  },
  date: "March 15, 2026",
  readTime: "5 min read",
  featured: false,
  tags: ["Meta Ads", "Creatives"],
  content: [
    { type: "paragraph", text: "Introduction text..." },
    { type: "heading", text: "1. Key Heading" },
    { type: "list", items: ["Point 1", "Point 2"] },
    { type: "quote", text: "Inspiring quote.", author: "Quote Author" },
    { type: "callout", title: "Pro Tip", text: "Actionable insider tip..." },
    { type: "keyTakeaways", title: "Key Takeaways", items: ["Takeaway 1", "Takeaway 2"] }
  ]
}
```

---

## 🚀 Preview & Deploy
- **Preview on Localhost:** [http://localhost:5173/blog](http://localhost:5173/blog)
- **Deploy to Live:** Commit and push to GitHub `main` branch.
