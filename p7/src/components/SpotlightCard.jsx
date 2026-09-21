import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SpotlightCard = ({ children, className }) => {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
