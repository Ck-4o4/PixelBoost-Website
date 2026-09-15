import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = "PixelBoost | Performance Marketing & Creative Production Agency";
const DEFAULT_DESC = "PixelBoost is a premier performance marketing, viral video production, and creative agency scaling brands across Meta Ads, high-converting shoots, and digital experiences.";
const DEFAULT_IMAGE = "https://pixelboost.in/logo.jpeg";
const SITE_NAME = "PixelBoost";

const updateMetaTag = (attrName, attrValue, content) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const updateCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
};

const updateStructuredData = (id, data) => {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const SEO = ({
  title,
  description,
  image,
  article,
  category,
  datePublished,
  authorName
}) => {
  const location = useLocation();
  const currentUrl = `https://pixelboost.in${location.pathname}`;

  useEffect(() => {
    // 1. Document Title
    const formattedTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    document.title = formattedTitle;

    // 2. Primary Meta Tags
    const finalDesc = description || DEFAULT_DESC;
    const finalImage = image || DEFAULT_IMAGE;

    updateMetaTag('name', 'description', finalDesc);
    updateMetaTag('name', 'title', formattedTitle);
    updateCanonical(currentUrl);

    // 3. OpenGraph Tags (Facebook, LinkedIn, WhatsApp)
    updateMetaTag('property', 'og:title', formattedTitle);
    updateMetaTag('property', 'og:description', finalDesc);
    updateMetaTag('property', 'og:image', finalImage);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', article ? 'article' : 'website');
    updateMetaTag('property', 'og:site_name', SITE_NAME);

    // 4. Twitter Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', formattedTitle);
    updateMetaTag('name', 'twitter:description', finalDesc);
    updateMetaTag('name', 'twitter:image', finalImage);
    updateMetaTag('name', 'twitter:url', currentUrl);

    // 5. Article Structured Data (Schema.org JSON-LD)
    if (article) {
      updateStructuredData('article-schema', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': finalDesc,
        'image': finalImage,
        'datePublished': datePublished || new Date().toISOString(),
        'author': {
          '@type': 'Person',
          'name': authorName || 'PixelBoost Team'
        },
        'publisher': {
          '@type': 'Organization',
          'name': SITE_NAME,
          'logo': {
            '@type': 'ImageObject',
            'url': DEFAULT_IMAGE
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': currentUrl
        },
        'articleSection': category || 'Marketing'
      });
    } else {
      const existingArticleSchema = document.getElementById('article-schema');
      if (existingArticleSchema) {
        existingArticleSchema.remove();
      }
    }
  }, [title, description, image, article, category, datePublished, authorName, currentUrl]);

  return null;
};

export default SEO;
