import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send, AlertCircle, RefreshCw, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY, getWhatsAppLink, COMPANY_PHONE, COMPANY_ADDRESS, SOCIAL_LINKS } from '../config/forms';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    service: 'Web Development',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          company: formData.company || 'N/A',
          service: formData.service,
          subject: `New PixelBoost Inquiry from ${formData.name}`,
          message: `Name: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nService: ${formData.service}\nEmail: ${formData.email}`
        })
      });

      const result = await response.json();
      if (result.success || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setStatus('success');
      } else {
        setErrorMessage(result.message || 'Failed to send inquiry. Please check your connection and try again.');
        setStatus('idle');
      }
    } catch (error) {
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setStatus('success');
      } else {
        setErrorMessage('Network error while sending. Please try again.');
        setStatus('idle');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      service: 'Web Development',
      email: '',
      message: ''
    });
    setStatus('idle');
    setErrorMessage('');
  };

  const mailtoLink = `mailto:hello@pixelboost.com?subject=${encodeURIComponent(`Inquiry from ${formData.name || 'Website Visitor'}`)}&body=${encodeURIComponent(
    `Name: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nService: ${formData.service}\nEmail: ${formData.email}\nMessage: ${formData.message || 'N/A'}`
  )}`;

  const whatsappMessage = `Hi PixelBoost! My name is ${formData.name || 'a website visitor'}${formData.company ? ` from ${formData.company}` : ''}. I'm interested in ${formData.service} and my email is ${formData.email || 'N/A'}.`;
  const whatsappUrl = getWhatsAppLink(whatsappMessage);

  return (
    <section id="contact" style={{ background: '#000', color: '#fff', padding: '8rem 0 4rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
          style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '3.5rem 3rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
              >
                <div style={{ display: 'inline-flex', padding: '1.2rem', borderRadius: '50%', background: 'rgba(91, 164, 201, 0.15)', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto 2rem auto' }}>
                  Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. We've logged your request regarding <strong style={{ color: 'var(--accent-secondary)' }}>{formData.service}</strong> and will get back to you within 24 hours at <span style={{ color: '#fff', textDecoration: 'underline' }}>{formData.email}</span>.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '1rem 2rem',
                      background: '#25D366',
                      color: '#fff',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      border: 'none'
                    }}
                  >
                    <MessageCircle size={18} fill="#fff" /> Chat on WhatsApp
                  </a>
                  <a
                    href={mailtoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '1rem 2rem',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: 500,
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <Mail size={18} /> Open Email App
                  </a>
                  <button
                    onClick={handleReset}
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '1rem 2rem',
                      background: '#fff',
                      color: '#000',
                      borderRadius: '50px',
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <RefreshCw size={18} /> Send Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
              >
                <div style={{ fontSize: '1.4rem', lineHeight: '2.2', color: 'rgba(255,255,255,0.9)' }}>
                  Hi, my name is 
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *" 
                    className="inline-input" 
                    style={{ minWidth: '180px', maxWidth: '240px' }} 
                    required
                  />
                  and I work at 
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company (optional)" 
                    className="inline-input" 
                    style={{ minWidth: '200px', maxWidth: '260px' }} 
                  />.
                  <br /><br />
                  I'm looking for a partner to help me with 
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="inline-input" 
                    style={{ minWidth: '220px', cursor: 'pointer' }}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="App Development">App Development</option>
                    <option value="Production">Production</option>
                  </select>.
                  <br /><br />
                  You can reach me at 
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *" 
                    className="inline-input" 
                    style={{ minWidth: '260px', maxWidth: '340px' }} 
                    required
                  />
                  to discuss further.
                </div>

                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ 
                        color: '#ff6b6b', 
                        background: 'rgba(255, 107, 107, 0.1)', 
                        padding: '0.8rem 1.2rem', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.6rem',
                        fontSize: '0.95rem'
                      }}
                    >
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  <motion.button 
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }} 
                    whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                    type="submit" 
                    disabled={status === 'submitting'}
                    style={{ 
                      flex: '1 1 240px',
                      padding: '1.25rem', 
                      background: '#fff', 
                      color: '#000', 
                      border: 'none', 
                      borderRadius: '50px', 
                      fontSize: '1.1rem', 
                      fontWeight: 600, 
                      cursor: status === 'submitting' ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem',
                      opacity: status === 'submitting' ? 0.8 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={20} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Inquiry
                      </>
                    )}
                  </motion.button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: '1 1 240px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem',
                      padding: '1.25rem',
                      background: '#25D366',
                      color: '#fff',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <MessageCircle size={20} fill="#fff" />
                    Connect on WhatsApp
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Office Contact Info Card */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '3rem auto 0 auto', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.02)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <MapPin size={22} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: '0.3rem' }}>Our Office</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {COMPANY_ADDRESS}
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.02)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <Phone size={22} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: '0.3rem' }}>Call / WhatsApp</div>
              <a 
                href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} 
                style={{ color: 'var(--accent-secondary)', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', display: 'block' }}
              >
                {COMPANY_PHONE}
              </a>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                Mon - Sat | 9:30 AM - 7:00 PM
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
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
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
            >
              LinkedIn
            </a>
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .inline-input {
          background: transparent;
          border: none;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          color: #fff;
          font-family: inherit;
          font-size: inherit;
          padding: 0.2rem 0.5rem;
          margin: 0 0.5rem;
          outline: none;
          transition: border-color 0.3s ease;
          text-align: center;
        }
        .inline-input:focus {
          border-bottom-color: var(--accent-secondary);
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        .inline-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        select.inline-input option {
          background: #111;
          color: #fff;
        }
        @media (max-width: 600px) {
          .inline-input {
            display: inline-block;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0.5rem 0;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;


