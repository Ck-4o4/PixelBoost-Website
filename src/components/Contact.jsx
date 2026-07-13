import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" style={{ background: '#000', color: '#fff', padding: '8rem 0 4rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: '1.1' }}
          >
            Have an idea?<br/>
            <span style={{ color: 'var(--accent-secondary)' }}>Let's build it.</span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '4rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ fontSize: '1.5rem', lineHeight: '2' }}>
              Hi, my name is 
              <input type="text" placeholder="Your Name" className="inline-input" style={{ width: '200px' }} />
              and I work at 
              <input type="text" placeholder="Company" className="inline-input" style={{ width: '250px' }} />.
              <br /><br />
              I'm looking for a partner to help me with 
              <select className="inline-input" style={{ width: '250px', cursor: 'pointer' }}>
                <option value="web">Web Development</option>
                <option value="marketing">Digital Marketing</option>
                <option value="app">App Development</option>
                <option value="shoot">Production</option>
              </select>.
              <br /><br />
              You can reach me at 
              <input type="email" placeholder="Email Address" className="inline-input" style={{ width: '300px' }} />
              to discuss further.
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              type="button" 
              style={{ 
                marginTop: '2rem', 
                padding: '1.5rem', 
                background: '#fff', 
                color: '#000', 
                border: 'none', 
                borderRadius: '50px', 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                cursor: 'pointer' 
              }}
            >
              Send Inquiry
            </motion.button>
          </form>
        </motion.div>

        <div style={{ marginTop: '8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img 
              src="/logo.jpeg" 
              alt="Brand Logo" 
              style={{ 
                height: '32px', 
                width: '32px', 
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(255,255,255,0.2)'
              }} 
            />
            <span>&copy; {new Date().getFullYear()} PixelBoost. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Twitter</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>LinkedIn</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </div>

      <style>{`
        .inline-input {
          background: transparent;
          border: none;
          border-bottom: 2px solid rgba(255,255,255,0.2);
          color: #fff;
          font-family: inherit;
          font-size: inherit;
          padding: 0 0.5rem;
          margin: 0 0.5rem;
          outline: none;
          transition: border-color 0.3s ease;
          text-align: center;
        }
        .inline-input:focus {
          border-bottom-color: var(--accent-secondary);
        }
        .inline-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        select.inline-input option {
          background: #000;
          color: #fff;
        }
      `}</style>
    </section>
  );
};

export default Contact;
