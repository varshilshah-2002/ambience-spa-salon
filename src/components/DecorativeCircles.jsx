import React from 'react';
import { motion } from 'framer-motion';

const DecorativeCircles = () => {
  return (
    <>
      {/* Top left circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -left-20 pointer-events-none"
      >
        <div className="w-40 h-40 rounded-full border-2 border-gold-DEFAULT absolute" />
        <div className="w-60 h-60 rounded-full border border-gold-light absolute -translate-x-1/4 -translate-y-1/4" />
      </motion.div>

      {/* Bottom right circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -bottom-20 -right-20 pointer-events-none"
      >
        <div className="w-48 h-48 rounded-full border-2 border-gold-DEFAULT absolute" />
        <div className="w-72 h-72 rounded-full border border-gold-light absolute translate-x-1/4 translate-y-1/4" />
      </motion.div>

      {/* Center decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="w-96 h-96 rounded-full border border-gold-DEFAULT absolute" />
        <div className="w-80 h-80 rounded-full border border-gold-light absolute translate-x-12" />
      </motion.div>
    </>
  );
};

export default DecorativeCircles;