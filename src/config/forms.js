// Web3Forms Configuration
// Get your free Access Key by entering your email at: https://web3forms.com
// You can paste your key below or set VITE_WEB3FORMS_ACCESS_KEY in a .env file.

export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

// Company Contact Details
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '916352032201';
export const COMPANY_PHONE = '+91 63520 32201';
export const COMPANY_ADDRESS = 'PNTC Tower, B-304, Times Of India Press Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015';

export const getWhatsAppLink = (customText = '') => {
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(customText || 'Hi PixelBoost! I would like to inquire about your services.');
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/pixelboost_in/',
  linkedin: 'https://www.linkedin.com/in/amit-n-8a81a7228/'
};
