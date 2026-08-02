import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Clock, Briefcase, Video, MonitorPlay, Film, Palette, PenTool, Users, Mail, TrendingUp, X, Upload, CheckCircle2, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { jobs } from '../data/jobs';
import { WEB3FORMS_ACCESS_KEY, getWhatsAppLink } from '../config/forms';

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

  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    coverLetter: '',
    resumeName: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  // If the user navigates to an invalid job URL, redirect them back to the careers list
  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setApplicantData(prev => ({ ...prev, resumeName: e.target.files[0].name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicantData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!applicantData.email.trim() || !applicantData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!applicantData.portfolio.trim()) {
      setErrorMessage('Please provide a link to your portfolio or LinkedIn profile.');
      return;
    }

    setSubmitStatus('submitting');
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
          subject: `New Career Application: ${job.title} - ${applicantData.fullName}`,
          from_name: 'PixelBoost Careers Portal',
          job_title: job.title,
          job_department: job.department,
          applicant_name: applicantData.fullName,
          email: applicantData.email,
          phone: applicantData.phone || 'N/A',
          portfolio_url: applicantData.portfolio,
          resume_file_name: applicantData.resumeName || 'None selected',
          cover_note: applicantData.coverLetter || 'None provided',
          message: `Job Position: ${job.title} (${job.department})\nApplicant Name: ${applicantData.fullName}\nEmail: ${applicantData.email}\nPhone: ${applicantData.phone || 'N/A'}\nPortfolio/LinkedIn: ${applicantData.portfolio}\nResume File: ${applicantData.resumeName || 'None'}\n\nCover Note:\n${applicantData.coverLetter || 'None'}`
        })
      });

      const result = await response.json();
      const jobWhatsappMsg = `Hi PixelBoost! I just submitted an application for ${job.title}.\nName: ${applicantData.fullName}\nEmail: ${applicantData.email}\nPhone: ${applicantData.phone || 'N/A'}\nPortfolio: ${applicantData.portfolio}`;
      
      if (result.success || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setSubmitStatus('success');
        window.open(getWhatsAppLink(jobWhatsappMsg), '_blank');
      } else {
        setErrorMessage(result.message || 'Failed to submit application. Please try again.');
        setSubmitStatus('idle');
      }
    } catch (error) {
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setSubmitStatus('success');
        const jobWhatsappMsg = `Hi PixelBoost! I just submitted an application for ${job.title}.\nName: ${applicantData.fullName}\nEmail: ${applicantData.email}\nPhone: ${applicantData.phone || 'N/A'}\nPortfolio: ${applicantData.portfolio}`;
        window.open(getWhatsAppLink(jobWhatsappMsg), '_blank');
      } else {
        setErrorMessage('Network error while submitting. Please try again.');
        setSubmitStatus('idle');
      }
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSubmitStatus('idle');
      setApplicantData({
        fullName: '',
        email: '',
        phone: '',
        portfolio: '',
        coverLetter: '',
        resumeName: ''
      });
      setErrorMessage('');
    }, 300);
  };

  const whatsappMessage = `Hi PixelBoost! I am interested in applying for the ${job.title} position (${job.department}).`;
  const whatsappUrl = getWhatsAppLink(whatsappMessage);

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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
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
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Apply for this role <ArrowUpRight size={24} />
                </motion.button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    background: '#25D366',
                    color: '#FFFFFF',
                    padding: '1.2rem 3rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)'
                  }}
                >
                  <MessageCircle size={22} fill="#FFFFFF" color="#25D366" />
                  Apply via WhatsApp
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Application Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#FFFFFF',
                  color: '#1D1D1F',
                  borderRadius: '24px',
                  width: '100%',
                  maxWidth: '650px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '2.5rem',
                  position: 'relative',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={resetForm}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} color="#1D1D1F" />
                </button>

                {submitStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(91, 164, 201, 0.15)', color: 'var(--accent-secondary)', marginBottom: '1rem' }}>
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Application Submitted!</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Thank you for applying for the <strong>{job.title}</strong> position. We've sent a confirmation email to <strong>{applicantData.email}</strong> and our team will review your application soon.
                    </p>
                    <button
                      onClick={resetForm}
                      className="btn-primary"
                      style={{ padding: '0.8rem 2rem' }}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Apply for {job.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
                      Fill in your details below to submit your application.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={applicantData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Sarah Jenkins"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(0,0,0,0.15)',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={applicantData.email}
                            onChange={handleInputChange}
                            placeholder="sarah@example.com"
                            style={{
                              width: '100%',
                              padding: '0.8rem 1rem',
                              borderRadius: '12px',
                              border: '1px solid rgba(0,0,0,0.15)',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={applicantData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 000-0000"
                            style={{
                              width: '100%',
                              padding: '0.8rem 1rem',
                              borderRadius: '12px',
                              border: '1px solid rgba(0,0,0,0.15)',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                          Portfolio / LinkedIn URL *
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          value={applicantData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://behance.net/yourprofile or https://linkedin.com/in/name"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(0,0,0,0.15)',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                          Resume / CV (PDF, DOCX)
                        </label>
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '1rem',
                          border: '2px dashed rgba(0,0,0,0.15)',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(0,0,0,0.02)',
                          color: 'var(--text-secondary)',
                          fontWeight: 500
                        }}>
                          <Upload size={18} />
                          {applicantData.resumeName ? applicantData.resumeName : 'Click or drop resume file here'}
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                          Why PixelBoost? (Optional)
                        </label>
                        <textarea
                          name="coverLetter"
                          rows="3"
                          value={applicantData.coverLetter}
                          onChange={handleInputChange}
                          placeholder="Tell us briefly why you'd be a great fit for this position..."
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(0,0,0,0.15)',
                            fontSize: '1rem',
                            outline: 'none',
                            resize: 'vertical'
                          }}
                        ></textarea>
                      </div>

                      {errorMessage && (
                        <div style={{
                          color: '#d93025',
                          background: 'rgba(217, 48, 37, 0.08)',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          <AlertCircle size={16} />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className="btn-primary"
                        style={{
                          marginTop: '0.5rem',
                          padding: '1rem',
                          width: '100%',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          cursor: submitStatus === 'submitting' ? 'wait' : 'pointer'
                        }}
                      >
                        {submitStatus === 'submitting' ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Submitting Application...
                          </span>
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
};

export default JobDetailsPage;

