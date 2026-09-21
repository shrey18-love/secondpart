import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ImageCard = ({ src, alt, index, totalImages }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        delay: index * 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      className={cn(
        "relative group cursor-pointer",
        "rounded-2xl overflow-hidden shadow-2xl",
        "bg-white p-2"
      )}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-pink-400 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-400 rounded-br-xl" />
    </motion.div>
  );
};

export default ImageCard;
