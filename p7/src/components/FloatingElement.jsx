import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, duration = 3 }) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
