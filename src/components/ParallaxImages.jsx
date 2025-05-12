import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

const ParallaxImages = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const y3 = useTransform(scrollY, [0, 500], [0, -30]);

  const images = [
    {
      src: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg",
      alt: "Luxury Hair Styling"
    },
    {
      src: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg",
      alt: "Salon Interior"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isMobile, images.length]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 w-full h-screen">
        <AnimatePresence mode="wait">
          {images.map((image, index) => (
            index === currentImageIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-serif text-beige-light mb-4 tracking-wider">
            AMBIENCE
          </h1>
          <h2 className="text-3xl font-serif text-beige-light mb-8">
            SALON • SPA
          </h2>
          <p className="text-xl text-beige-light/80 font-light tracking-widest">
            Premium Beauty Services
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 mt-12">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative h-[600px] overflow-hidden rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          style={{
            y: index === 0 ? y1 : index === 1 ? y2 : y3
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
        </motion.div>
      ))}
    </div>
  );
};

export default ParallaxImages;