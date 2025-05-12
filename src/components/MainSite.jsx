import React from 'react';
import Hero from './Hero';
import Introduction from './Introduction';
import Services from './Services';
import Contact from './Contact';

function MainSite() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Introduction />
      <Services />
      <Contact />
    </div>
  );
}

export default MainSite;