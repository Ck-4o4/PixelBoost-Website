import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { blogs } from '../src/data/blogs.js';

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: NOTION_API_KEY });

async function setup() {
  console.log('🚀 Initializing Notion database schema...');

  // 1. Update database properties / columns
  try {
    const updatedDb = await notion.databases.update({
      database_id: NOTION_DATABASE_ID,
      properties: {
        'Category': {
          select: {
            options: [
              { name: 'Meta Ads', color: 'blue' },
              { name: 'Video Production', color: 'purple' },
              { name: 'Branding & Design', color: 'pink' },
              { name: 'Growth Marketing', color: 'green' }
            ]
          }
        },
        'Excerpt': {
          rich_text: {}
        },
        'Date': {
          date: {}
        },
        'Author': {
          rich_text: {}
        },
        'Published': {
          checkbox: {}
        },
        'Featured': {
          checkbox: {}
        },
        'Tags': {
          multi_select: {
            options: [
              { name: 'Meta Ads', color: 'blue' },
              { name: 'ROAS', color: 'green' },
              { name: 'Reels', color: 'red' },
              { name: 'Video Editing', color: 'purple' },
              { name: 'Brand Identity', color: 'orange' },
              { name: 'Growth', color: 'yellow' }
            ]
          }
        },
        'Slug': {
          rich_text: {}
        }
      }
    });
    console.log('✅ Database properties/columns configured successfully!');
  } catch (err) {
    console.log('Property update note:', err.message);
  }

  // 2. Insert initial sample blog articles into Notion
  console.log('\n📝 Inserting starter blog articles into Notion...');
  for (const blog of blogs) {
    try {
      // Build blocks for Notion page
      const children = [];

      for (const block of blog.content) {
        if (block.type === 'paragraph') {
          children.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: block.text } }]
            }
          });
        } else if (block.type === 'heading') {
          children.push({
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [{ type: 'text', text: { content: block.text } }]
            }
          });
        } else if (block.type === 'subheading') {
          children.push({
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [{ type: 'text', text: { content: block.text } }]
            }
          });
        } else if (block.type === 'quote') {
          children.push({
            object: 'block',
            type: 'quote',
            quote: {
              rich_text: [{ type: 'text', text: { content: block.text } }]
            }
          });
        } else if (block.type === 'callout') {
          children.push({
            object: 'block',
            type: 'callout',
            callout: {
              rich_text: [{ type: 'text', text: { content: `${block.title ? block.title + ': ' : ''}${block.text}` } }],
              icon: { emoji: '💡' }
            }
          });
        } else if (block.type === 'list') {
          for (const item of block.items) {
            children.push({
              object: 'block',
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [{ type: 'text', text: { content: item } }]
              }
            });
          }
        } else if (block.type === 'keyTakeaways') {
          children.push({
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [{ type: 'text', text: { content: block.title || 'Key Takeaways' } }]
            }
          });
          for (const item of block.items) {
            children.push({
              object: 'block',
              type: 'to_do',
              to_do: {
                rich_text: [{ type: 'text', text: { content: item } }],
                checked: true
              }
            });
          }
        }
      }

      await notion.pages.create({
        parent: { database_id: NOTION_DATABASE_ID },
        cover: {
          type: 'external',
          external: { url: blog.coverImage }
        },
        properties: {
          Name: {
            title: [{ text: { content: blog.title } }]
          },
          Category: {
            select: { name: blog.category }
          },
          Excerpt: {
            rich_text: [{ text: { content: blog.excerpt } }]
          },
          Author: {
            rich_text: [{ text: { content: blog.author.name } }]
          },
          Published: {
            checkbox: true
          },
          Featured: {
            checkbox: !!blog.featured
          },
          Tags: {
            multi_select: blog.tags.map(t => ({ name: t }))
          },
          Slug: {
            rich_text: [{ text: { content: blog.id } }]
          }
        },
        children: children.slice(0, 95) // Notion max 100 blocks per request
      });

      console.log(`  ✅ Added article: "${blog.title}"`);
    } catch (err) {
      console.error(`  ⚠️ Could not insert "${blog.title}":`, err.message);
    }
  }

  console.log('\n🎉 Notion Blog Setup is 100% complete!');
}

setup();
