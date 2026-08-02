import React from 'react';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Expertise from '../components/Expertise';
import MetaAdsGallery from '../components/MetaAdsGallery';
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
      <Process />
    </main>
  );
};

export default Home;
