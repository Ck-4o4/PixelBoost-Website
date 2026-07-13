import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const words = ["Growth.", "Experiences.", "Dominance.", "The Extraordinary."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ textAlign: 'center', width: '100%' }}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}
        >
          PixelBoost Agency
        </motion.p>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 7rem)', 
          fontWeight: 700, 
          letterSpacing: '-0.04em',
          lineHeight: '1.1',
          margin: 0
        }}>
          We Engineer
          <br />
          <div style={{ height: '1.2em', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ position: 'absolute', color: 'var(--accent-secondary)' }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)'
        }}
      >
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ width: '100%', height: '50%', background: 'var(--text-primary)' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
