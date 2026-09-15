import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.VITE_NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || process.env.VITE_NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error('\n❌ Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env file!');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

function getPlainText(richTextArray) {
  if (!richTextArray || !Array.isArray(richTextArray)) return '';
  return richTextArray.map(t => t.plain_text).join('').trim();
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

async function getPageBlocks(pageId) {
  try {
    const res = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, { headers });
    const data = await res.json();
    if (!data.results) return { formattedBlocks: [], fullText: '' };

    const formattedBlocks = [];
    let fullText = '';

    for (const block of data.results) {
      if (block.type === 'paragraph') {
        const text = getPlainText(block.paragraph?.rich_text);
        if (text) {
          formattedBlocks.push({ type: 'paragraph', text });
          fullText += ' ' + text;
        }
      } else if (block.type === 'heading_1' || block.type === 'heading_2') {
        const text = getPlainText(block[block.type]?.rich_text);
        if (text) {
          formattedBlocks.push({ type: 'heading', level: 2, text });
          fullText += ' ' + text;
        }
      } else if (block.type === 'heading_3') {
        const text = getPlainText(block.heading_3?.rich_text);
        if (text) {
          formattedBlocks.push({ type: 'subheading', text });
          fullText += ' ' + text;
        }
      } else if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
        const text = getPlainText(block[block.type]?.rich_text);
        if (text) {
          const lastBlock = formattedBlocks[formattedBlocks.length - 1];
          if (lastBlock && lastBlock.type === 'list') {
            lastBlock.items.push(text);
          } else {
            formattedBlocks.push({ type: 'list', items: [text] });
          }
          fullText += ' ' + text;
        }
      } else if (block.type === 'quote') {
        const text = getPlainText(block.quote?.rich_text);
        if (text) {
          formattedBlocks.push({ type: 'quote', text, author: 'PixelBoost Team' });
          fullText += ' ' + text;
        }
      } else if (block.type === 'callout') {
        const text = getPlainText(block.callout?.rich_text);
        if (text) {
          formattedBlocks.push({ type: 'callout', title: 'Key Note', text });
          fullText += ' ' + text;
        }
      } else if (block.type === 'to_do') {
        const text = getPlainText(block.to_do?.rich_text);
        if (text) {
          const lastBlock = formattedBlocks[formattedBlocks.length - 1];
          if (lastBlock && lastBlock.type === 'keyTakeaways') {
            lastBlock.items.push(text);
          } else {
            formattedBlocks.push({ type: 'keyTakeaways', title: 'Key Points', items: [text] });
          }
          fullText += ' ' + text;
        }
      } else if (block.type === 'image') {
        const src = block.image?.file?.url || block.image?.external?.url;
        const caption = getPlainText(block.image?.caption) || '';
        if (src) {
          formattedBlocks.push({ type: 'image', src, caption });
        }
      }
    }

    return { formattedBlocks, fullText };
  } catch (error) {
    console.error(`Error fetching blocks for page ${pageId}:`, error.message);
    return { formattedBlocks: [], fullText: '' };
  }
}

async function syncBlogsFromNotion() {
  console.log('\n🚀 Connecting to Notion Database...');

  try {
    const queryRes = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filter: {
          or: [
            {
              property: 'Published',
              checkbox: {
                equals: true
              }
            }
          ]
        }
      })
    });

    const response = await queryRes.json();
    if (!response.results) {
      throw new Error(response.message || 'Failed to query database');
    }

    console.log(`✨ Found ${response.results.length} published blog(s) in Notion.`);

    const blogs = [];

    for (const page of response.results) {
      const props = page.properties;

      // Title
      let title = 'Untitled Article';
      for (const key in props) {
        if (props[key].type === 'title') {
          title = getPlainText(props[key].title) || title;
          break;
        }
      }

      // Excerpt
      const excerpt =
        getPlainText(props.Excerpt?.rich_text) ||
        getPlainText(props.Description?.rich_text) ||
        'Explore this deep dive from the PixelBoost team.';

      // Category
      const category =
        props.Category?.select?.name ||
        props.Category?.multi_select?.[0]?.name ||
        'Growth Marketing';

      // Date
      const dateVal = props.Date?.date?.start || page.created_time;
      const formattedDate = dateVal
        ? new Date(dateVal).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : 'Recent Article';

      // Author
      const authorName =
        getPlainText(props.Author?.rich_text) ||
        props.Author?.select?.name ||
        'PixelBoost Team';

      // Cover Image
      let coverImage =
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        props.Cover?.files?.[0]?.file?.url ||
        props.Cover?.files?.[0]?.external?.url ||
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop';

      // Tags
      const tags = props.Tags?.multi_select?.map(t => t.name) || [category];

      // Slug / ID
      const customSlug = getPlainText(props.Slug?.rich_text);
      const id = customSlug || slugify(title) || page.id;

      // Featured
      const featured = props.Featured?.checkbox || false;

      // Page Blocks
      console.log(`  - Syncing: "${title}"`);
      const { formattedBlocks, fullText } = await getPageBlocks(page.id);

      const readTime = estimateReadTime(fullText + ' ' + excerpt);

      blogs.push({
        id,
        title,
        excerpt,
        category,
        coverImage,
        author: {
          name: authorName,
          role: 'Contributor',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
        },
        date: formattedDate,
        readTime,
        featured,
        tags,
        content: formattedBlocks.length > 0 ? formattedBlocks : [
          { type: 'paragraph', text: excerpt }
        ]
      });
    }

    // Write to src/data/blogs.js
    const targetFile = path.resolve(__dirname, '../src/data/blogs.js');
    const fileContent = `/**
 * Auto-synced via Notion CMS
 * Last synced: ${new Date().toISOString()}
 */

export const BLOG_CATEGORIES = [
  "All",
  "Meta Ads",
  "Video Production",
  "Branding & Design",
  "Growth Marketing"
];

export const blogs = ${JSON.stringify(blogs, null, 2)};
`;

    fs.writeFileSync(targetFile, fileContent, 'utf-8');
    console.log(`\n🎉 Successfully synced ${blogs.length} articles to src/data/blogs.js!`);
  } catch (error) {
    console.error('\n❌ Notion Sync Failed:', error.message);
    process.exit(1);
  }
}

syncBlogsFromNotion();
