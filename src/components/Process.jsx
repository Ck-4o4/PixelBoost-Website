import React from 'react';
import { motion } from 'framer-motion';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We dive deep into your business, analyzing your market, competitors, and exact user demographics to engineer a strategy that guarantees growth."
    },
    {
      number: "02",
      title: "Design & Engineering",
      description: "Our award-winning team designs the aesthetic and builds the robust, scalable architecture needed to bring the vision to life flawlessly."
    },
    {
      number: "03",
      title: "Launch & Scale",
      description: "We deploy your product and immediately ignite targeted marketing campaigns to drive massive traffic and maximize your ROI from day one."
    }
  ];

  return (
    <section id="process" className="section-padding" style={{ background: '#000', color: '#fff' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem' }}>The Process.</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            A proven, transparent methodology designed for maximum impact.
          </p>
        </motion.div>

        <div className="grid-3" style={{ position: 'relative' }}>
          {/* Connecting Line */}
          <div style={{ 
            position: 'absolute', 
            top: '40px', 
            left: '10%', 
            right: '10%', 
            height: '1px', 
            background: 'rgba(255,255,255,0.2)',
            zIndex: 0,
            display: 'none' // Hide on mobile, show on desktop via CSS
          }} className="desktop-line"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
              style={{ position: 'relative', zIndex: 1, padding: '2rem', textAlign: 'center' }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#000', 
                border: '1px solid rgba(255,255,255,0.2)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--accent-secondary)'
              }}>
                {step.number}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500 }}>{step.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{step.description}</p>
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
