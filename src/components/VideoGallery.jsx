import React from 'react';

const VideoGallery = () => {
  const videos = [
    "/Shoots/falcon podcast1.MOV",
    "/Shoots/falcon podcast2.MOV"
  ];

  return (
    <div>
      <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '2rem', textAlign: 'center' }}>Recent Video Shoots</h4>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        width: '100%'
      }}>
        {videos.map((src, idx) => (
          <div key={idx} style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0,0,0,0.05)',
            backgroundColor: '#000',
            position: 'relative'
          }}>
            <video 
              src={src}
              controls
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
