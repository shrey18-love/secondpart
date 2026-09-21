import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift, Cake } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Heart, color: 'text-pink-500', position: { top: '10%', left: '10%' }, delay: 0 },
    { Icon: Sparkles, color: 'text-yellow-500', position: { top: '20%', right: '15%' }, delay: 0.5 },
    { Icon: Gift, color: 'text-purple-500', position: { bottom: '15%', left: '20%' }, delay: 1 },
    { Icon: Cake, color: 'text-blue-500', position: { bottom: '25%', right: '10%' }, delay: 1.5 },
    { Icon: Heart, color: 'text-red-500', position: { top: '50%', left: '5%' }, delay: 2 },
    { Icon: Sparkles, color: 'text-pink-400', position: { top: '70%', right: '5%' }, delay: 2.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color}`}
          style={item.position}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <item.Icon size={32} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
