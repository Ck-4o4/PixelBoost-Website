import { Flame, ExternalLink, Play } from 'lucide-react';

const InstagramIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const instagramReels = [
  {
    id: 'DHlSHLiPrUQ',
    title: 'Viral Marketing Reel',
    url: 'https://www.instagram.com/reel/DHlSHLiPrUQ/',
    badge: '🔥 Viral Reel'
  },
  {
    id: 'DZW3HpyRlJP',
    title: 'Creative Brand Campaign',
    url: 'https://www.instagram.com/reel/DZW3HpyRlJP/',
    badge: '🚀 High Reach'
  },
  {
    id: 'DTu6yi5jRLZ',
    title: 'Commercial Production',
    url: 'https://www.instagram.com/reel/DTu6yi5jRLZ/',
    badge: '⚡ Trending Content'
  },
  {
    id: 'DOlqnE5k_pl',
    title: 'Brand Growth Reel',
    url: 'https://www.instagram.com/reel/DOlqnE5k_pl/',
    badge: '🎯 High Engagement'
  }
];

const localVideos = [
  { title: "Falcon Security Podcast - Part 1", src: "/Shoots/falcon-podcast1.MOV" },
  { title: "Falcon Security Podcast - Part 2", src: "/Shoots/falcon-podcast2.MOV" }
];

const VideoGallery = () => {
  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.6rem', 
          padding: '0.5rem 1.2rem', 
          background: 'rgba(225, 48, 108, 0.1)', 
          color: '#E1306C', 
          borderRadius: '50px', 
          fontSize: '0.9rem', 
          fontWeight: 700, 
          marginBottom: '1rem' 
        }}>
          <Flame size={18} color="#E1306C" /> Viral Marketing & Shoots
        </div>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 0.8rem 0' }}>
          Viral Instagram Reels & Production
        </h3>
        <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
          Explore our viral social content, high-engagement Instagram Reels, and full-scale video shoot productions.
        </p>
      </div>

      {/* Instagram Reels Grid */}
      <div style={{ marginBottom: '5rem' }}>
        <h4 style={{ 
          fontSize: '1.4rem', 
          fontWeight: 700, 
          color: '#0F172A', 
          marginBottom: '2rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.6rem' 
        }}>
          <InstagramIcon color="#E1306C" size={24} /> Featured Instagram Reels
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          {instagramReels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Badge & Title Bar */}
              <div style={{
                width: '100%',
                padding: '1rem 1.2rem',
                background: '#F8FAFC',
                borderBottom: '1px solid #F1F5F9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                  {reel.title}
                </span>
                <span style={{
                  padding: '0.3rem 0.7rem',
                  background: 'rgba(225, 48, 108, 0.12)',
                  color: '#E1306C',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {reel.badge}
                </span>
              </div>

              {/* Embedded Instagram Iframe */}
              <div style={{
                width: '100%',
                minHeight: '480px',
                background: '#000',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <iframe
                  src={`https://www.instagram.com/p/${reel.id}/embed`}
                  title={reel.title}
                  width="100%"
                  height="480"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    width: '100%',
                    height: '480px'
                  }}
                />
              </div>

              {/* Action Footer */}
              <div style={{ width: '100%', padding: '1rem 1.2rem', background: '#FFFFFF' }}>
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(225, 48, 108, 0.2)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <InstagramIcon size={18} color="#fff" /> Watch on Instagram <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Shoots Section */}
      <div>
        <h4 style={{ 
          fontSize: '1.4rem', 
          fontWeight: 700, 
          color: '#0F172A', 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Play size={22} color="#1E3A8A" /> Shoot Production & Podcasts
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          {localVideos.map((vid, idx) => (
            <div key={idx} style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
              border: '1px solid #E2E8F0',
              backgroundColor: '#000',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                padding: '1rem 1.2rem',
                background: '#1E293B',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                {vid.title}
              </div>

              <div style={{ height: '380px', background: '#000' }}>
                <video 
                  src={vid.src}
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default VideoGallery;
