import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Maximize2, Award } from 'lucide-react';

const metaAdsData = [
  {
    id: 'resort',
    title: 'Resort Business',
    client: 'Jawai Resort & Wildlife',
    category: 'Hospitality & Luxury Tourism',
    image: '/meta-ads/resort-business.jpg',
    metrics: [
      { label: 'Total Reach', value: '2.04M+' },
      { label: 'Inquiries', value: '518+' },
      { label: 'Cost / 1K Reach', value: '₹2.57' }
    ],
    highlights: [
      'Messaging conversions scaled 518+ bookings',
      'Hyper-targeted wildlife safari & luxury stay audience',
      'Consistently low acquisition cost under ₹15.89 per lead'
    ]
  },
  {
    id: 'clothing',
    title: 'Clothing Business',
    client: 'Brand Wala Apparel',
    category: 'E-Commerce & Fashion',
    image: '/meta-ads/clothing-business.jpg',
    metrics: [
      { label: 'Accounts Reached', value: '60,184' },
      { label: 'Ad Impressions', value: '34,013' },
      { label: 'Cost per Click', value: '₹0.45' }
    ],
    highlights: [
      'High CTR conversion campaign for new clothing line',
      'Boosted direct WhatsApp & Instagram DMs',
      'Multi-ad set retargeting for fashion shoppers'
    ]
  },
  {
    id: 'salon',
    title: 'Salon Business',
    client: 'Cut & Scissor Salon',
    category: 'Beauty & Wellness',
    image: '/meta-ads/salon-business.jpg',
    metrics: [
      { label: 'Profile Visits', value: '46,151' },
      { label: 'Cost per Visit', value: '₹0.96' },
      { label: 'Messaging Conversions', value: '72+' }
    ],
    highlights: [
      'Hyper-local radius targeting for salon opening offer',
      '₹0.96 cost per Instagram profile visit',
      'Direct appointment booking drive via WhatsApp'
    ]
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Business',
    client: 'Soarth Masala Industry',
    category: 'FMCG & B2B Distribution',
    image: '/meta-ads/manufacturing-business.jpg',
    metrics: [
      { label: 'Direct Inquiries', value: '362' },
      { label: 'Total Reach', value: '48,284' },
      { label: 'Cost per Lead', value: '₹5.36' }
    ],
    highlights: [
      '362 qualified B2B distributor inquiries',
      'Ultra-efficient ₹5.36 per messaging conversion',
      'Targeted dealership acquisition campaign'
    ]
  },
  {
    id: 'food',
    title: 'Rajyash Foods',
    client: 'Rajyash Consumer Goods',
    category: 'Food & Beverage Brand',
    image: '/meta-ads/rajyash-foods.jpg',
    metrics: [
      { label: 'Total Reach', value: '1.60M+' },
      { label: 'Reel Views', value: '830,874' },
      { label: 'Cost per 1K Reach', value: '₹4.47' }
    ],
    highlights: [
      '1.6 Million Accounts Center total reach',
      'Massive viral awareness reel campaign',
      'Regional festival & offer distribution drive'
    ]
  }
];

const MetaAdsGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Intro Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.6rem', 
          padding: '0.5rem 1.2rem', 
          background: 'rgba(30, 58, 138, 0.08)', 
          color: '#1E3A8A', 
          borderRadius: '50px', 
          fontSize: '0.9rem', 
          fontWeight: 700, 
          marginBottom: '1rem' 
        }}>
          <Award size={18} color="#1E3A8A" /> Proof of Performance
        </div>
        <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 0.8rem 0' }}>
          Meta Ads Campaign Results
        </h3>
        <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
          Real campaign screenshots showcasing verified reach, high conversion rates, and industry-leading return on ad spend (ROAS).
        </p>
      </div>

      {/* Grid of Results */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: '2rem' 
      }}>
        {metaAdsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(30, 58, 138, 0.15)' }}
          >
            {/* Image Preview Container */}
            <div 
              style={{ 
                position: 'relative', 
                aspectRatio: '1/1', 
                background: '#000', 
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onClick={() => setSelectedImage(item)}
            >
              <img 
                src={item.image} 
                alt={`${item.title} Meta Ads Results`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                className="meta-ad-img"
              />
              
              {/* Overlay Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                padding: '0.4rem 0.9rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                zIndex: 2
              }}>
                {item.category}
              </div>

              {/* View Fullscreen Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 3
              }} className="meta-ad-overlay">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}>
                  <Maximize2 size={16} /> Inspect Dashboard
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.2rem 0' }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '0.88rem', color: '#1E40AF', fontWeight: 600 }}>
                  {item.client}
                </div>
              </div>

              {/* Key Metrics Banner */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '0.5rem', 
                background: '#F8FAFC', 
                padding: '0.8rem', 
                borderRadius: '12px', 
                marginBottom: '1.2rem',
                border: '1px solid #F1F5F9'
              }}>
                {item.metrics.map((m, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.2rem' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights List */}
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.88rem', lineHeight: '1.6', flex: 1 }}>
                {item.highlights.map((h, i) => (
                  <li key={i} style={{ marginBottom: '0.3rem' }}>{h}</li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => setSelectedImage(item)}
                style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  padding: '0.8rem',
                  background: '#1E3A8A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E3A8A'}
              >
                <Eye size={18} /> View Campaign Data
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                position: 'relative',
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '90vh',
                background: '#0F172A',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                padding: '1.2rem 1.8rem',
                background: '#1E293B',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                    {selectedImage.title} — Meta Ads Manager Report
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                    {selectedImage.client} ({selectedImage.category})
                  </div>
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image */}
              <div style={{ padding: '1.5rem', textAlign: 'center', overflowY: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .meta-ad-img:hover {
          transform: scale(1.04);
        }
        div:hover > .meta-ad-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default MetaAdsGallery;
