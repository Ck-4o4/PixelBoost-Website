import React from 'react';
import { motion } from 'framer-motion';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "Understanding your business, audience and goals before building the right direction."
    },
    {
      number: "02",
      title: "Build & Create",
      description: "Turning strategy into stronger branding, content, digital experiences and marketing."
    },
    {
      number: "03",
      title: "Launch & Improve",
      description: "Putting the right plan into action, measuring results and improving what moves your business forward"
    }
  ];

  return (
    <section id="process" className="section-padding" style={{ background: '#000', color: '#fff' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem' }}>The Process.</h2>
          </motion.div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            A clear, strategic approach from understanding your business to driving growth.
          </p>
        </motion.div>

        <div className="grid-3" style={{ position: 'relative' }}>
          {/* Connecting Animated Line (Desktop Only) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ 
              position: 'absolute', 
              top: '40px', 
              left: '15%', 
              right: '15%', 
              height: '2px', 
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05), var(--accent-secondary), rgba(255,255,255,0.05))',
              transformOrigin: 'left',
              zIndex: 0,
              display: 'none'
            }} 
            className="desktop-line" 
          />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: index * 0.25, duration: 0.5, type: 'spring', damping: 20 }}
              style={{ position: 'relative', zIndex: 1, padding: '2rem', textAlign: 'center' }}
            >
              <motion.div 
                initial={{ scale: 0, rotate: -45, backgroundColor: '#000' }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 25px rgba(42, 169, 224, 0.5)", 
                  borderColor: "var(--accent-secondary)",
                  backgroundColor: "rgba(42, 169, 224, 0.1)"
                }}
                transition={{ 
                  scale: { delay: index * 0.25 + 0.2, type: 'spring', stiffness: 200, damping: 15 },
                  rotate: { delay: index * 0.25 + 0.2, type: 'spring', stiffness: 200, damping: 15 },
                  backgroundColor: { duration: 0.3 }
                }}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  border: '2px solid rgba(255,255,255,0.15)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 2rem auto',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--accent-secondary)',
                  cursor: 'pointer'
                }}
              >
                {step.number}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.25 + 0.4 }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500 }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .desktop-line { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default Process;
