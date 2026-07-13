import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem', maxWidth: '800px' }}
        >
          <h1 style={{ fontSize: '5rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem' }}>
            Careers at PixelBoost
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', lineHeight: 1.6 }}>
            Join a collective of extraordinary designers, engineers, and storytellers. We are building the future of digital experiences, and we need your expertise.
          </p>
        </motion.div>

        {/* Short Job Summary List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover="hover"
              style={{ 
                background: 'var(--bg-secondary)', 
                borderRadius: '24px', 
                padding: '3rem',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem'
              }}
            >
              {/* Job Info */}
              <div style={{ flex: '1', minWidth: '300px' }}>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
                  {job.department}
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 1rem 0' }}>
                  {job.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '500px' }}>
                  {job.excerpt}
                </p>
                
                {/* Badges */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 500 }}>
                    <MapPin size={16} color="var(--text-secondary)" /> {job.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 500 }}>
                    <Clock size={16} color="var(--text-secondary)" /> {job.type}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 500 }}>
                    <Briefcase size={16} color="var(--text-secondary)" /> {job.experience}
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <Link 
                to={`/careers/${job.id}`}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  variants={{ hover: { x: 5 } }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  View Details <ArrowRight size={20} />
                </motion.div>
              </Link>

            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CareersPage;
