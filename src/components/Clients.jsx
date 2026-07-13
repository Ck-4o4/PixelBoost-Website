import React from 'react';

const clientLogos = [
  "/client1.jpg", 
  "/client2.jpg", 
  "/client3.jpg", 
  "/client4.jpg",
  "/client5.jpg",
  "/client6.png",
  "/client7.png",
  "/client8.jpg",
  "/client9.jpg",
  "/client10.jpg",
  "/client11.jpg",
  "/client12.jpg",
  "/client13.jpg",
  "/client14.jpg",
  "/22.jpg",
  "/23.png",
  "/24.jpg",
  "/25.jpg",
  "/26.jpg",
  "/28.jpg",
  "/29.jpg",
  "/30.jpg",
  "/31.png",
  "/32.jpeg",
  "/Toran Kala Logo.png"
];

// We double the list to create a seamless infinite loop
const marqueeItems = [...clientLogos, ...clientLogos];

const Clients = () => {
  return (
    <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="marquee-container" style={{ display: 'flex', width: '100vw', overflow: 'hidden', position: 'relative' }}>
        {/* Left and Right gradients for smooth fading edges */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '100px', background: 'linear-gradient(to right, var(--bg-secondary), transparent)', zIndex: 10 }}></div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '100px', background: 'linear-gradient(to left, var(--bg-secondary), transparent)', zIndex: 10 }}></div>

        <div className="marquee-content" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content', animation: 'scroll 60s linear infinite', alignItems: 'center' }}>
          {marqueeItems.map((logo, index) => (
            <div 
              key={index} 
              style={{ 
                padding: '0 4rem', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = 0.6;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img src={logo} alt="Client Logo" style={{ height: '110px', maxWidth: '220px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
