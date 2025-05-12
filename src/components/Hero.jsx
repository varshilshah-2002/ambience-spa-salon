import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroImages } from '../utils/imageData';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const currentImage = isMobile 
    ? heroImages[currentImageIndex].mobile 
    : heroImages[currentImageIndex].desktop;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{
            scale: {
              duration: 9,
              ease: "linear"
            },
            opacity: { duration: 1 }
          }}
          className="absolute inset-0"
        >
          <img 
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-center">
      <motion.img
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  src="https://i.ibb.co/5hV7nS6/1-4.png"
  alt="Decorative"
  className="w-32 md:w-48 mb-6 md:mb-8"
/>

        <h1 className="text-4xl md:text-7xl font-serif text-beige-light mb-2 md:mb-4 tracking-wider">
          AMBIENCE SALON AND SPA
        </h1>
        <h2 className="text-2xl md:text-5xl font-serif text-beige-light mb-4 md:mb-8">
          BROW • LASH • HAIR • HENNA
        </h2>
        <p className="text-lg md:text-xl text-beige-light/80 font-light tracking-widest">
        Inspired by You, Perfected by Us
        </p>
      </div>
    </div>
  );
};

export default Hero;