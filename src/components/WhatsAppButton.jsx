import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../config/forms';

const WhatsAppButton = () => {
  const whatsappUrl = getWhatsAppLink("Hi PixelBoost team! I'm reaching out from your website.");

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)' }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1500,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      <MessageCircle size={32} fill="#FFFFFF" color="#25D366" />
    </motion.a>
  );
};

export default WhatsAppButton;
