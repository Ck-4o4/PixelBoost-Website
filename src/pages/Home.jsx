import React from 'react';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Expertise from '../components/Expertise';
import MetaAdsGallery from '../components/MetaAdsGallery';
import VideoGallery from '../components/VideoGallery';
import Process from '../components/Process';

const Home = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <Expertise />
      <section id="meta-ads" style={{ background: '#FAFAFA', padding: '5rem 0' }}>
        <div className="container">
          <MetaAdsGallery />
        </div>
      </section>
      <section id="viral-reels" style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container">
          <VideoGallery />
        </div>
      </section>
      <Process />
    </main>
  );
};

export default Home;
