import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: scrolled ? '1rem 0' : '1.5rem 0',
    background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
    transition: 'all 0.3s ease'
  };

  const linkStyle = {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.95rem',
    position: 'relative',
    padding: '0.5rem 0'
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      style={navStyle}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{ ...linkStyle, fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src="/logo.jpeg" 
            alt="Brand Logo" 
            style={{ 
              height: '40px', 
              width: '40px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              border: '1px solid var(--border-subtle)'
            }} 
          />
          PixelBoost.
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none' }} className="desktop-menu">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <Link to="/#expertise" className="nav-link" style={linkStyle}>Expertise</Link>
            <Link to="/work" className="nav-link" style={linkStyle}>Work</Link>
            <Link to="/#process" className="nav-link" style={linkStyle}>Process</Link>
            <Link to="/careers" className="nav-link" style={linkStyle}>Careers</Link>
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              className="btn-primary" 
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
            >
              Let's Talk
            </motion.a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: 'block', cursor: 'pointer' }} className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X color="black" /> : <Menu color="black" />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              overflow: 'hidden'
            }}
          >
            <Link to="/#expertise" style={linkStyle} onClick={() => setIsMobileMenuOpen(false)}>Expertise</Link>
            <Link to="/work" style={linkStyle} onClick={() => setIsMobileMenuOpen(false)}>Work</Link>
            <Link to="/#process" style={linkStyle} onClick={() => setIsMobileMenuOpen(false)}>Process</Link>
            <Link to="/careers" style={linkStyle} onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
            <a href="#contact" className="btn-primary" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Let's Talk</a>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--text-primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
