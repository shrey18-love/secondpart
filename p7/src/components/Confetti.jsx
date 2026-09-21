import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 5 + Math.random() * 5,
      color: ['#ff6b9d', '#c06bff', '#6bc5ff', '#ffd93d', '#6bffb8'][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti absolute w-3 h-3"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${piece.animationDuration}s`,
            borderRadius: piece.shape === 'circle' ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
