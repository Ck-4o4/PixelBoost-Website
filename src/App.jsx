import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import CareersPage from './pages/CareersPage';
import JobDetailsPage from './pages/JobDetailsPage';
import WorkPage from './pages/WorkPage';

// Scroll to Hash behavior for React Router
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const AppContent = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <CustomCursor />
      <ScrollToHash />
      <WhatsAppButton />
      
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--accent-primary)',
          transformOrigin: '0%',
          zIndex: 1001
        }}
      />

      <div className="mesh-bg"></div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:jobId" element={<JobDetailsPage />} />
      </Routes>
      
      <Contact />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
