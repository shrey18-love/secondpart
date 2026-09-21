import React from 'react';
import { motion } from 'framer-motion';

const BentoGrid = ({ children, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 gap-4 ${className}`}>
      {children}
    </div>
  );
};

const BentoGridItem = ({ children, className, colSpan = "md:col-span-2" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 ${colSpan} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export { BentoGrid, BentoGridItem };
