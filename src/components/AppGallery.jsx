import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layers, ShieldCheck, Zap } from 'lucide-react';

const AppGallery = () => {
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Featured Mobile Experiences</h4>
        <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Crafting intuitive and powerful mobile applications that drive engagement and streamline complex operations.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Visual Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.25)',
            backgroundColor: '#0f111a',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <img 
            src="/falcon-app.jpg" 
            alt="Falcon Fighter Force Application Design"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.4rem 1.2rem', borderRadius: '50px', background: '#EFF6FF', color: '#1E40AF', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', border: '1px solid #BFDBFE' }}>
              UI/UX Design & Development
            </div>
            <div style={{ padding: '0.4rem 1.2rem', borderRadius: '50px', background: '#F8FAFC', color: '#475569', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', border: '1px solid #E2E8F0' }}>
              Security
            </div>
          </div>
          
          <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Falcon Fighter Force App
          </h3>
          
          <p style={{ color: '#4A5568', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            We engineered a comprehensive digital ecosystem for Falcon Fighter Force, transforming their operational workflow. From intuitive administrative dashboards for real-time monitoring to seamless mobile experiences for on-ground personnel, the application combines robust functionality with a premium, sleek dark-mode aesthetic.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.8rem', borderRadius: '12px', background: '#F1F5F9', color: '#0F172A' }}>
                <Smartphone size={22} />
              </div>
              <div>
                <h5 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Native Experience</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', lineHeight: 1.4 }}>Fluid, responsive design built for max performance.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.8rem', borderRadius: '12px', background: '#F1F5F9', color: '#0F172A' }}>
                <Layers size={22} />
              </div>
              <div>
                <h5 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Complex Systems</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', lineHeight: 1.4 }}>Dozens of seamless user flows mapped perfectly.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.8rem', borderRadius: '12px', background: '#F1F5F9', color: '#0F172A' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h5 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Enterprise Security</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', lineHeight: 1.4 }}>Designed for secure data handling and tracking.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.8rem', borderRadius: '12px', background: '#F1F5F9', color: '#0F172A' }}>
                <Zap size={22} />
              </div>
              <div>
                <h5 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Dark Mode UI</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', lineHeight: 1.4 }}>Sleek, modern aesthetic that reduces eye strain.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppGallery;
