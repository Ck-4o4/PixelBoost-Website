import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { blogs, BLOG_CATEGORIES } from '../data/blogs';

const BlogListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogs.find(b => b.featured) || blogs[0];
  }, []);

  return (
    <div style={{
      backgroundColor: '#FAFAFA',
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '6rem',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Top Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#64748B' }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#1E3A8A', fontWeight: 600 }}>Blog & Insights</span>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            margin: '0 0 1rem 0'
          }}>
            Insights, Tactics & <span style={{ color: '#1E3A8A' }}>Growth Strategies</span>
          </h1>

          <p style={{
            color: '#64748B',
            fontSize: '1.15rem',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Explore proven frameworks on Meta Ads, high-retention video production, brand identity, and scalable growth from the PixelBoost team.
          </p>

          {/* Search & Category Filter Bar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            {/* Search Input Box */}
            <div style={{
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: '1.2rem',
                  color: '#94A3B8',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Search by topic, keyword, or tag (e.g. ROAS, Reels, Branding)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem 1rem 3.2rem',
                  borderRadius: '50px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  fontSize: '1rem',
                  color: '#0F172A',
                  outline: 'none',
                  boxShadow: '0 8px 25px rgba(15, 23, 42, 0.06)',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1E3A8A';
                  e.target.style.boxShadow = '0 10px 30px rgba(30, 58, 138, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = '0 8px 25px rgba(15, 23, 42, 0.06)';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1.2rem',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem'
            }}>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '50px',
                    border: selectedCategory === cat ? '1px solid #1E3A8A' : '1px solid #E2E8F0',
                    backgroundColor: selectedCategory === cat ? '#1E3A8A' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedCategory === cat ? '0 4px 14px rgba(30, 58, 138, 0.2)' : '0 2px 5px rgba(0,0,0,0.02)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post Highlight (Only shown when not searching and on "All") */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#64748B',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BookOpen size={16} color="#1E3A8A" /> Featured Deep Dive
            </div>

            <Link
              to={`/blog/${featuredPost.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(15, 23, 42, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(15, 23, 42, 0.08)';
                }}
              >
                {/* Image */}
                <div style={{ minHeight: '340px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1.2rem',
                    left: '1.2rem',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(30, 58, 138, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    {featuredPost.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.85rem',
                    color: '#64748B',
                    marginBottom: '1rem'
                  }}>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: '1.25',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                  }}>
                    {featuredPost.title}
                  </h2>

                  <p style={{
                    color: '#64748B',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    marginBottom: '1.8rem'
                  }}>
                    {featuredPost.excerpt}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid #F1F5F9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                          {featuredPost.author.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#1E3A8A',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}>
                      Read Article <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Section Heading */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: 500, marginLeft: '0.6rem' }}>
              ({filteredBlogs.length})
            </span>
          </h3>
        </div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          {filteredBlogs.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {filteredBlogs.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  style={{ display: 'flex' }}
                >
                  <Link
                    to={`/blog/${post.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 8px 24px -8px rgba(15, 23, 42, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 16px 36px -10px rgba(15, 23, 42, 0.12)';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(15, 23, 42, 0.06)';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                    >
                      {/* Image */}
                      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '50px',
                          backgroundColor: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {post.category}
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div style={{
                        padding: '1.6rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          fontSize: '0.8rem',
                          color: '#64748B',
                          marginBottom: '0.8rem'
                        }}>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={13} /> {post.readTime}
                          </span>
                        </div>

                        <h4 style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          lineHeight: '1.35',
                          marginBottom: '0.7rem',
                          letterSpacing: '-0.01em'
                        }}>
                          {post.title}
                        </h4>

                        <p style={{
                          color: '#64748B',
                          fontSize: '0.92rem',
                          lineHeight: 1.5,
                          marginBottom: '1.4rem',
                          flexGrow: 1
                        }}>
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                            {post.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  color: '#475569',
                                  backgroundColor: '#F1F5F9',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '6px'
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Author & Read Link */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '1rem',
                          borderTop: '1px solid #F1F5F9'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                              {post.author.name}
                            </span>
                          </div>

                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            color: '#1E3A8A',
                            fontWeight: 700,
                            fontSize: '0.88rem'
                          }}>
                            Read <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0'
              }}
            >
              <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                No articles found
              </h4>
              <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                We couldn't find any articles matching "{searchQuery}". Try searching with different keywords or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '50px',
                  backgroundColor: '#1E3A8A',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default BlogListPage;
