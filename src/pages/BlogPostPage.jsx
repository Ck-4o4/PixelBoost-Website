import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Check, 
  ArrowRight, 
  Quote, 
  CheckCircle2, 
  Lightbulb, 
  ChevronRight 
} from 'lucide-react';
import { blogs as fallbackBlogs } from '../data/blogs';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [blogList, setBlogList] = useState(fallbackBlogs);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setBlogList(data.blogs);
        }
      })
      .catch(() => {});
  }, []);

  const post = blogList.find((b) => b.id === slug);

  if (!post) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#FAFAFA'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
          Article Not Found
        </h2>
        <p style={{ color: '#64748B', marginBottom: '2rem' }}>
          The article you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.8rem',
            borderRadius: '50px',
            backgroundColor: '#1E3A8A',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          <ArrowLeft size={18} /> Back to All Articles
        </Link>
      </div>
    );
  }

  const relatedPosts = blogList
    .filter((b) => b.id !== post.id && (b.category === post.category || true))
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div style={{
      backgroundColor: '#FAFAFA',
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '6rem',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Top Breadcrumb & Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#64748B' }}>
            <Link to="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/blog" style={{ color: '#64748B', textDecoration: 'none' }}>Blog</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#1E3A8A', fontWeight: 600 }}>{post.category}</span>
          </div>

          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#1E3A8A',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          {/* Category Badge */}
          <div style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            borderRadius: '50px',
            backgroundColor: 'rgba(30, 58, 138, 0.08)',
            color: '#1E3A8A',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1.2rem'
          }}>
            {post.category}
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.03em',
            lineHeight: '1.18',
            marginBottom: '1.2rem'
          }}>
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p style={{
            color: '#475569',
            fontSize: '1.18rem',
            lineHeight: 1.6,
            marginBottom: '1.8rem',
            fontWeight: 400
          }}>
            {post.excerpt}
          </p>

          {/* Author Bar & Metadata */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.2rem 0',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                  {post.author.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  {post.author.role} • {post.date}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748B', fontSize: '0.9rem' }}>
                <Clock size={16} /> {post.readTime}
              </div>

              {/* Share Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleCopyLink}
                  title="Copy Article Link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '50px',
                    backgroundColor: copied ? '#DCFCE7' : '#F1F5F9',
                    color: copied ? '#15803D' : '#334155',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  {copied ? 'Copied!' : 'Share'}
                </button>

                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                  title="Share on X (Twitter)"
                >
                  𝕏
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    color: '#0A66C2',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                  title="Share on LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '3rem',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
            maxHeight: '480px'
          }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        {/* Article Body Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)',
            marginBottom: '4rem'
          }}
        >
          {post.content.map((block, idx) => {
            if (block.type === 'paragraph') {
              return (
                <p
                  key={idx}
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.75,
                    color: '#334155',
                    marginBottom: '1.6rem'
                  }}
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === 'heading') {
              return (
                <h2
                  key={idx}
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.02em',
                    marginTop: '2.5rem',
                    marginBottom: '1rem',
                    lineHeight: 1.3
                  }}
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'subheading') {
              return (
                <h3
                  key={idx}
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginTop: '2rem',
                    marginBottom: '0.8rem'
                  }}
                >
                  {block.text}
                </h3>
              );
            }

            if (block.type === 'quote') {
              return (
                <div
                  key={idx}
                  style={{
                    margin: '2.5rem 0',
                    padding: '2rem',
                    backgroundColor: '#F8FAFC',
                    borderLeft: '4px solid #1E3A8A',
                    borderRadius: '0 16px 16px 0',
                    position: 'relative'
                  }}
                >
                  <Quote size={32} color="#1E3A8A" style={{ opacity: 0.2, marginBottom: '0.5rem' }} />
                  <p style={{
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    color: '#0F172A',
                    lineHeight: 1.5,
                    margin: '0 0 0.8rem 0'
                  }}>
                    "{block.text}"
                  </p>
                  {block.author && (
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>
                      — {block.author}
                    </div>
                  )}
                </div>
              );
            }

            if (block.type === 'callout') {
              return (
                <div
                  key={idx}
                  style={{
                    margin: '2rem 0',
                    padding: '1.6rem 2rem',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '16px',
                    display: 'flex',
                    gap: '1rem'
                  }}
                >
                  <Lightbulb size={24} color="#1E40AF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    {block.title && (
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1E3A8A', margin: '0 0 0.4rem 0' }}>
                        {block.title}
                      </h4>
                    )}
                    <p style={{ margin: 0, color: '#1E3A8A', fontSize: '0.98rem', lineHeight: 1.6 }}>
                      {block.text}
                    </p>
                  </div>
                </div>
              );
            }

            if (block.type === 'list') {
              return (
                <ul
                  key={idx}
                  style={{
                    paddingLeft: '1.2rem',
                    marginBottom: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}
                >
                  {block.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        color: '#334155'
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === 'keyTakeaways') {
              return (
                <div
                  key={idx}
                  style={{
                    margin: '2.5rem 0',
                    padding: '2rem',
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#15803D',
                    marginBottom: '1.2rem'
                  }}>
                    <CheckCircle2 size={22} color="#16A34A" /> {block.title || "Key Takeaways"}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {block.items.map((item, tIdx) => (
                      <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#16A34A',
                          marginTop: '0.6rem',
                          flexShrink: 0
                        }} />
                        <span style={{ fontSize: '1rem', color: '#166534', lineHeight: 1.5, fontWeight: 500 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* Tags */}
          {post.tags && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #F1F5F9'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center' }}>
                Related Tags:
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#1E3A8A',
                    backgroundColor: '#EFF6FF',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>

        {/* Author Bio Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 700 }}>
              Written By
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0.2rem 0' }}>
              {post.author.name}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.4 }}>
              {post.author.role} at PixelBoost. Driving high-growth digital marketing, creative strategy, and digital production.
            </div>
          </div>
        </div>

        {/* Agency CTA Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '5rem',
          boxShadow: '0 20px 40px -10px rgba(30, 58, 138, 0.3)'
        }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>
            Ready to Scale Your Brand with PixelBoost?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 2rem auto' }}>
            Let our creative and performance marketing team build high-converting ad campaigns and viral video content for your business.
          </p>
          <a
            href="/#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2.2rem',
              borderRadius: '50px',
              backgroundColor: '#38b6ff',
              color: '#070708',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(56, 182, 255, 0.4)',
              transition: 'transform 0.2s ease'
            }}
          >
            Get in Touch With Us <ArrowRight size={18} />
          </a>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '2rem',
              letterSpacing: '-0.02em'
            }}>
              More Articles from PixelBoost
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.8rem'
            }}>
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  to={`/blog/${rPost.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                    }}
                  >
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '1.2rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.4rem' }}>
                        {rPost.category}
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.4, margin: '0 0 0.6rem 0' }}>
                        {rPost.title}
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        {rPost.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPostPage;
