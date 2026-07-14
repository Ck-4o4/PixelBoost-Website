import React, { useState, useEffect } from 'react';
import './PortfolioGallery.css';

const PortfolioGallery = () => {
  const FOLDER = "/slides";
  const getName = (n) => `${FOLDER}/slide-${String(n).padStart(2, "0")}.jpg`;
  
  // Generate slides 1 to 25, removing 2-10, 24, 25
  const slideNumbers = Array.from({ length: 25 }, (_, i) => i + 1).filter(n => {
    if (n >= 2 && n <= 10) return false;
    if (n >= 24) return false;
    return true;
  });
  const TOTAL = slideNumbers.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const step = (dir) => {
    setCurrentIndex((prev) => (prev + dir + TOTAL) % TOTAL);
  };

  return (
    <div className="portfolio-gallery-container">
      <main className="portfolio-grid" aria-label="Portfolio gallery">
        {slideNumbers.map((slideNum, index) => (
          <button 
            key={slideNum} 
            className="portfolio-tile" 
            aria-label={`Open project ${index + 1}`}
            onClick={() => openLightbox(index)}
          >
            <img src={getName(slideNum)} alt={`Portfolio piece ${index + 1}`} loading="lazy" />
            <span className="portfolio-num">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </main>

      {/* Lightbox */}
      <div 
        className={`portfolio-lightbox ${isOpen ? "open" : ""}`} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Image viewer"
        onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
      >
        <button className="lb-close" aria-label="Close" onClick={closeLightbox}>&times;</button>
        <button className="lb-btn lb-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); step(-1); }}>&#8249;</button>
        {isOpen && (
          <img src={getName(slideNumbers[currentIndex])} alt={`Portfolio piece ${currentIndex + 1}`} onClick={(e) => e.stopPropagation()} />
        )}
        <button className="lb-btn lb-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); step(1); }}>&#8250;</button>
        <div className="lb-counter">{String(currentIndex + 1).padStart(2, "0")} / {TOTAL}</div>
      </div>
    </div>
  );
};

export default PortfolioGallery;
