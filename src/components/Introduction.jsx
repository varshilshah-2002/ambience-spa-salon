import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Introduction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-32 bg-beige-light relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[40vw] font-['Allura'] text-custom-black whitespace-nowrap transform -rotate-6">
          Ambience
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-beige-dark uppercase tracking-widest text-sm mb-2"
          >
          
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-custom-black mb-6"
          >
            The Art of Relaxation and Radiance
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px bg-beige-DEFAULT max-w-[120px] mx-auto mb-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-custom-black/80 leading-relaxed mb-32"
          >
            Ambience is a full-service salon located in Memphis, Tennessee. 
            It is here that we welcome you to familiarize yourself with our team 
            of artists and the extensive services we offer. Experience the pinnacle 
            of beauty and wellness in our luxurious setting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="md:order-1 order-2">
              <h2 className="text-4xl md:text-5xl font-serif text-custom-black mb-4 md:text-left text-center">Meet Sandy & Sachi</h2>
              <div className="w-32 h-0.5 bg-beige-DEFAULT/50 mb-8 md:mx-0 mx-auto"></div>
              <p className="text-custom-black/80 leading-relaxed text-justify md:text-left">
                With over 10 years of experience as an esthetician (Sachi) and cosmetologist (Sandy) in Memphis, TN, Sandy and Sachi are passionate about enhancing the natural beauty of their clients. Together, they provide a comprehensive beauty experience, blending their unique skills to ensure every client leaves feeling pampered, confident, and beautiful from head to toe. Whether you're in for a relaxing facial or a fresh new hairstyle, their commitment to excellence and personalized service shines through in everything they do.
              </p>
            </div>
            <div className="relative md:order-2 order-1 mb-8 md:mb-0">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-beige-DEFAULT/10 shadow-2xl">
                <img
                  src="https://i.ibb.co/Xpg1GFW/7.png"
                  alt="Sandy & Sachi"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="absolute -bottom-12 -right-12 w-64 h-64 overflow-hidden rounded-sm border border-beige-DEFAULT/10 shadow-2xl">
                <img
                  src="https://i.ibb.co/K2qqfGN/8.png"
                  alt="Working"
                  className="w-full h-full object-cover"
                />
              </div> */}
              <div className="absolute -left-4 -top-4 w-24 h-24 border-t border-l border-beige-DEFAULT/10"></div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 border-b border-r border-beige-DEFAULT/10"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;