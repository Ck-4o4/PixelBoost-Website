import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Monitor, Palette, Globe, MapPin, ExternalLink, ShieldCheck, TreePine, Navigation } from 'lucide-react';
import PortfolioGallery from '../components/PortfolioGallery';
import VideoGallery from '../components/VideoGallery';
import AppGallery from '../components/AppGallery';
import MetaAdsGallery from '../components/MetaAdsGallery';

const projects = [
  {
    id: 1,
    title: "FALCON FIGHTER FORCE",
    tagline: "A complete digital presence for a leading private security agency.",
    badge: "Featured Project",
    heading: "Security Agency Website",
    description: "A professional website built for Falcon Fighter Force to showcase their security services, presence across India and commitment to safety.",
    image: "/falcon-mockup.png",
    link: "https://falconfighterforce.com/",
    features: [
      { icon: <Monitor size={24} color="#1E3A8A" />, title: "Responsive Website", text: "Fully responsive across all devices" },
      { icon: <Palette size={24} color="#1E3A8A" />, title: "Modern & Professional Design", text: "Clean, user-friendly and professional UI/UX" },
      { icon: <ShieldCheck size={24} color="#1E3A8A" />, title: "Service Showcase", text: "Highlights security services, events and company strength" },
      { icon: <MapPin size={24} color="#1E3A8A" />, title: "Pan India Presence", text: "Showcasing operations across 7+ states with multiple branches" }
    ]
  },
  {
    id: 2,
    title: "CHANDRAPRABHA RESORT",
    tagline: "Unwind in the heart of nature's sanctuary.",
    badge: "New Launch",
    heading: "Luxury Wildlife Resort",
    description: "Nestled within the heart of Jawai, Chandraprabha offers a sanctuary where the untamed beauty of nature meets luxury and sustainability.",
    image: "/chandraprabha-mockup.jpg",
    link: "https://chandraprabharesort.com/",
    features: [
      { icon: <Monitor size={24} color="#1E3A8A" />, title: "Digital Experience", text: "Immersive website showcasing luxury accommodations" },
      { icon: <Globe size={24} color="#1E3A8A" />, title: "Safari Booking System", text: "Seamless integration for booking Leopard Safaris and excursions" },
      { icon: <TreePine size={24} color="#1E3A8A" />, title: "Nature & Conservation", text: "Highlighting wildlife integration and sustainable practices" },
      { icon: <Navigation size={24} color="#1E3A8A" />, title: "Hotel Network", text: "Showcasing properties like Hotel Meghdoot & Kumbhal Van Resort" }
    ]
  }
];

const categories = ["Website", "Meta Ads Results", "Apps", "Graphics", "Shoots"];

const WorkPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Website");

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const currentProject = projects[currentIndex];

  const renderCaseStudies = () => (
    <>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '3rem',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        
        {/* Left Column: Visuals & Carousel */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {/* Website Screenshot Container */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentProject.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              style={{
                width: '100%',
                maxWidth: '550px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(0,0,0,0.05)',
                backgroundColor: '#fff',
                aspectRatio: '16/10'
              }}
              className="portfolio-item-container"
            >
              <a href={currentProject.link} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                <img 
                  src={currentProject.image} 
                  alt={`${currentProject.title} Website`} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="portfolio-image"
                />
                
                {/* Hover Overlay */}
                <div 
                  className="portfolio-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 10
                  }}
                >
                  <div 
                    className="portfolio-link-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      backgroundColor: '#1E40AF',
                      color: '#fff',
                      padding: '0.8rem 1.8rem',
                      borderRadius: '50px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transform: 'translateY(20px)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 10px 15px -3px rgba(30, 64, 175, 0.3)'
                    }}
                  >
                    Visit Website <ExternalLink size={18} />
                  </div>
                </div>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Details & Features */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProject.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
                {currentProject.heading}
              </h4>
              <div style={{ 
                padding: '0.3rem 0.8rem',
                borderRadius: '50px',
                border: '1px solid #F59E0B',
                color: '#D97706',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap'
              }}>
                {currentProject.badge}
              </div>
            </div>
            
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {currentProject.description}
            </p>

            <div style={{ height: '1px', backgroundColor: '#E2E8F0', marginBottom: '1.5rem', width: '100%' }}></div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {currentProject.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {React.cloneElement(feature.icon, { size: 20 })}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.2rem 0' }}>{feature.title}</h5>
                    <p style={{ color: '#64748B', margin: 0, fontSize: '0.85rem', lineHeight: 1.3 }}>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}>
        <div 
          onClick={prevProject}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer', transition: 'all 0.2s ease', color: '#4A5568' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1E40AF'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#4A5568'; }}
        >
          <ArrowLeft size={24} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#fff', padding: '1rem 1.5rem', borderRadius: '50px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          {projects.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: currentIndex === idx ? '#1E3A8A' : '#E2E8F0',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            ></div>
          ))}
        </div>
        
        <div 
          onClick={nextProject}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer', transition: 'all 0.2s ease', color: '#4A5568' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1E40AF'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#4A5568'; }}
        >
          <ArrowRight size={24} />
        </div>
      </div>
    </>
  );

  return (
    <div style={{ 
      backgroundColor: '#FAFAFA', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '6rem 0 6rem 0', 
      paddingTop: '120px',
      overflow: 'hidden' 
    }}>
      <div className="container">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A5568', margin: 0 }}>
              Our Client Work
            </h2>
            <div style={{ width: '40px', height: '3px', backgroundColor: '#1E3A8A', marginTop: '0.5rem', marginBottom: '1.5rem', borderRadius: '2px' }}></div>
          </div>
          
          <h3 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>
            Selected Projects
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Explore our diverse portfolio of digital experiences, visual identities, and creative campaigns.
          </p>

          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem', marginBottom: '4rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  border: activeCategory === cat ? '1px solid #1E3A8A' : '1px solid #E2E8F0',
                  backgroundColor: activeCategory === cat ? '#1E3A8A' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#4A5568',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(30, 58, 138, 0.2)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Rendering based on Category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeCategory === "Website" && (
              <div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '2rem', textAlign: 'center' }}>Recent Work</h4>
                {renderCaseStudies()}
              </div>
            )}

            {activeCategory === "Meta Ads Results" && (
              <div>
                <MetaAdsGallery />
              </div>
            )}

            {activeCategory === "Graphics" && (
              <div>
                <PortfolioGallery />
              </div>
            )}

            {activeCategory === "Shoots" && (
              <div>
                <VideoGallery />
              </div>
            )}

            {activeCategory === "Apps" && (
              <div>
                <AppGallery />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      <style>{`
        .portfolio-item-container:hover .portfolio-image {
          transform: scale(1.05);
        }
        .portfolio-item-container:hover .portfolio-overlay {
          opacity: 1 !important;
        }
        .portfolio-item-container:hover .portfolio-link-btn {
          transform: translateY(0) !important;
        }
        .portfolio-link-btn:hover {
          background-color: #2563EB !important;
        }
      `}</style>
    </div>
  );
};

export default WorkPage;
