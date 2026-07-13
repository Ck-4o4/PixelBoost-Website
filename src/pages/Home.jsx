import React from 'react';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Expertise from '../components/Expertise';
import Process from '../components/Process';

const Home = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <Expertise />
      <Process />
    </main>
  );
};

export default Home;
