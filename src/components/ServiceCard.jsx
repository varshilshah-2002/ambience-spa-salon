import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      <div className="relative h-[500px] overflow-hidden rounded-sm shadow-lg">
        {/* Gold Glimmer Effect */}
        <motion.div 
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent pointer-events-none"
        />
        
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-beige-dark bg-opacity-60 transition-opacity duration-500"></div>
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-beige-light">
          <h3 className="text-2xl font-serif mb-4">{title}</h3>
          <p className="text-sm opacity-90 mb-6">{description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="self-start px-6 py-2 bg-beige-DEFAULT text-custom-black rounded-sm hover:bg-beige-dark hover:text-beige-light transition-colors duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;