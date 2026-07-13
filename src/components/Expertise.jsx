import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MonitorSmartphone, TrendingUp, Code2, Camera } from 'lucide-react';

const Expertise = () => {
  const [activeTab, setActiveTab] = useState(0);

  const expertiseData = [
    {
      title: "Web Development",
      icon: <MonitorSmartphone size={24} />,
      content: "We engineer high-performance, scalable web platforms. Our stack is focused on modern React (Next.js/Vite) paired with custom, tailored styling systems. We don't use templates.",
      metric: "Sub-second",
      metricLabel: "Average Load Time"
    },
    {
      title: "Digital Marketing",
      icon: <TrendingUp size={24} />,
      content: "Data-driven marketing that scales. From SEO to highly targeted ad campaigns, we map out the exact funnel your users need to convert at the highest possible rate.",
      metric: "300%+",
      metricLabel: "Average ROI Increase"
    },
    {
      title: "App Development",
      icon: <Code2 size={24} />,
      content: "Native iOS and Android applications built for the modern user. We focus on incredibly smooth UX and robust backend integrations to keep your app fast and reliable.",
      metric: "4.9",
      metricLabel: "Average App Store Rating"
    },
    {
      title: "Production & Shoots",
      icon: <Camera size={24} />,
      content: "High-end visual storytelling. We handle full-scale photography and video production to ensure your brand's visual identity is as extraordinary as your digital product.",
      metric: "8K",
      metricLabel: "Cinematic Quality"
    }
  ];

  return (
    <section id="expertise" className="section-padding" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Our Expertise.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '500px' }}>Focused disciplines engineered to elevate your brand.</p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          {/* Navigation */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {expertiseData.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  background: activeTab === index ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === index ? '#FFFFFF' : 'var(--text-primary)',
                  border: '1px solid',
                  borderColor: activeTab === index ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {item.icon}
                  {item.title}
                </div>
                {activeTab === index && <motion.div layoutId="activeArrow"><ArrowRight size={20} /></motion.div>}
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div style={{ flex: '2', minWidth: '300px', position: 'relative', minHeight: '300px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ padding: '2rem 0' }}
              >
                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{expertiseData[activeTab].title}</h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '3rem', maxWidth: '600px' }}>
                  {expertiseData[activeTab].content}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--accent-secondary)', lineHeight: '1' }}>{expertiseData[activeTab].metric}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>{expertiseData[activeTab].metricLabel}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
