import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Clock, Briefcase, Video, MonitorPlay, Film, Palette, PenTool, Users, Mail, TrendingUp } from 'lucide-react';
import { jobs } from '../data/jobs';

// Icon Map helper to render the correct string-based icon name from data
const IconMap = {
  Video: <Video size={18} />,
  MonitorPlay: <MonitorPlay size={18} />,
  Film: <Film size={18} />,
  Palette: <Palette size={18} />,
  PenTool: <PenTool size={18} />,
  Users: <Users size={18} />,
  Mail: <Mail size={18} />,
  TrendingUp: <TrendingUp size={18} />
};

const JobDetailsPage = () => {
  const { jobId } = useParams();
  
  // Find the exact job from our data array based on the URL param
  const job = jobs.find(j => j.id === jobId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  // If the user navigates to an invalid job URL, redirect them back to the careers list
  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Back Button */}
        <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 500 }}>
          <ArrowLeft size={18} /> Back to Careers
        </Link>

        {/* Job Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: 'var(--bg-secondary)', 
            borderRadius: '24px', 
            padding: '4rem',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
          }}
        >
          {/* Job Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                 {job.department}
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
                {job.title}
              </h1>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.8rem 1.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 500 }}>
                <MapPin size={18} color="var(--text-secondary)" /> {job.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.8rem 1.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 500 }}>
                <Clock size={18} color="var(--text-secondary)" /> {job.type}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.8rem 1.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 500 }}>
                <Briefcase size={18} color="var(--text-secondary)" /> {job.experience}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            
            {/* Left Column: Requirements & Software */}
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>Requirements</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8 }}>
                {job.requirements.map((req, i) => (
                  <li key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>•</span> {req}
                  </li>
                ))}
              </ul>

              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginTop: '3rem', marginBottom: '1.5rem' }}>Software Mastery</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {job.software.map((sw, i) => (
                  <span key={i} style={{ background: 'var(--bg-primary)', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {IconMap[sw.icon] || null} {sw.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Responsibilities & Apply */}
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>Responsibilities</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                {job.responsibilities}
              </p>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:careers@pixelboost.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  padding: '1.5rem 3rem',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  width: '100%'
                }}
              >
                Apply for this role <ArrowUpRight size={24} />
              </motion.a>
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default JobDetailsPage;
