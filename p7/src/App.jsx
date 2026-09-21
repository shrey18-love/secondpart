import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Calendar, Clock, Camera, X } from 'lucide-react';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const images = [
    { 
      src: '/2026-09-03 00.13.28.jpg', 
      alt: 'Our beautiful moment', 
      caption: 'The place and the person',
      message: 'The place was asthetic the person seating beside me was asthetic✨. and ignoring my friend and giving you full attention is the best thing i can see the jealosy on their faces 😂'
    },
    { 
      src: '/2026-09-03 00.13.50.jpg', 
      alt: 'Candid happiness', 
      caption: 'The captured photo',
      message: 'I really wanted to capture more images with you on my birthday 🎂. but i was so blend in the moment i havent consider the time and at the end we wont have enough time to click more photos 🤧'
    },
    { 
      src: '/2026-09-03 00.13.57.jpg', 
      alt: 'Together', 
      caption: 'flower bouquet',
      message: 'What an amazing gift it is 🥹. I just flatterd seeing this. I know you are lazy person and you took this much time efforts and risk for me made me cry that day ofcourse i am not able to show you that on the face 🥹🫠🫂 '
    },
    { 
      src: '/2026-09-03 00.14.00.jpg', 
      alt: 'Celebration', 
      caption: 'The bag',
      message: 'Even the bag was so pookie just like you 🥹❤️ i have to hide it inside this waredrobe becauase it hold the memories and thing that i not wanted to show anyone 🥹 '
    },
    { 
      src: '/2026-09-03 00.14.03.jpg', 
      alt: 'Memory', 
      caption: 'The latter',
      message: 'You just had me with this 🫠. This is so good yrr i cant imagine someone do this much efforts forme you choose the rose pear it and stick in the heart shape just for me 🫠🥹 and the paper you created by your hand and the latter and the writing every thing is just wooww for me 🫠 '
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Elegant gradient mesh background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-purple-950/40 to-slate-950" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, rgba(236, 72, 153, 0.15), transparent 50%)`,
          }}
        />
        
        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="max-w-7xl mx-auto text-center">
            
            {/* Elegant header with better typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-8"
              >
                <Heart size={60} className="text-rose-400 fill-rose-400/20 drop-shadow-2xl" strokeWidth={1.5} />
              </motion.div>

              <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block mb-3"
                >
                  <span className="bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 bg-clip-text text-transparent">
                    That Birthday
                  </span>
                </motion.span>
                
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="block font-['Dancing_Script'] text-7xl md:text-8xl bg-gradient-to-r from-amber-200 via-rose-300 to-pink-300 bg-clip-text text-transparent"
                >
                  We Spent Together
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 1.5 + (i * 0.1),
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Star 
                      className={`${i === 2 ? 'w-5 h-5' : 'w-4 h-4'} text-amber-300 fill-amber-300`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="max-w-3xl mx-auto mb-16"
            >
              <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl lg:text-4xl text-rose-100/80 font-light leading-relaxed italic">
                Not just a birthday, but a beautiful memory
                <br />
                <span className="text-pink-300 not-italic font-medium">that I want to cherish forever</span>
              </p>
            </motion.div>

            {/* Date badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <Calendar className="text-rose-300" size={20} />
              <span className="font-['Inter'] text-rose-200 text-lg">A Day to Remember</span>
              <Clock className="text-rose-300" size={20} />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-3"
              >
                <p className="font-['Inter'] text-xs text-rose-300/60 uppercase tracking-[0.2em]">See Our Moments</p>
                <div className="w-[1px] h-16 bg-gradient-to-b from-rose-300/50 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Polaroid Photo Gallery Section */}
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <Camera className="text-rose-400" size={32} />
                <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                    Captured Moments
                  </span>
                </h2>
              </div>
              <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-rose-100/70 italic max-w-2xl mx-auto">
                Each photograph holds a piece of that beautiful day
              </p>
            </motion.div>

            {/* Polaroid style photo grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {images.map((image, index) => {
                const initialRotation = (index % 2 === 0 ? 1 : -1) * (index % 3 + 1.5);
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotate: initialRotation }}
                  whileInView={{ opacity: 1, y: 0, rotate: initialRotation }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className="group cursor-pointer"
                >
                  {/* Polaroid frame */}
                  <div className="bg-white p-4 pb-16 shadow-2xl hover:shadow-rose-500/20 transition-shadow duration-300">
                    {/* Image container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                      <motion.img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center p-4"
                      >
                        <p className="font-['Inter'] text-white text-sm uppercase tracking-wider">
                          Click to see message
                        </p>
                      </motion.div>
                    </div>
                    
                    {/* Handwritten style caption */}
                    <div className="absolute bottom-6 left-0 right-0 px-4">
                      <p className="font-['Dancing_Script'] text-gray-600 text-center text-xl">
                        {image.caption}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="text-amber-400" size={24} />
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Heartfelt Message Section */}
        <section className="relative py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Elegant card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 text-center">
                  {/* Animated heart */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-8"
                  >
                    <Heart size={72} className="text-rose-400 fill-rose-400/30 mx-auto drop-shadow-2xl" strokeWidth={1.5} />
                  </motion.div>
                  
                  <h3 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 bg-clip-text text-transparent">
                      What It Meant to Me
                    </span>
                  </h3>
                  
                  <div className="space-y-6 mb-10">
                    <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-rose-50/90 leading-relaxed">
                      It wasn't just about the birthday celebration.
                    </p>
                    
                    <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-rose-50/90 leading-relaxed">
                      It was about the Surprise that you give me. it made my day ❤️
                    </p>

                    <p className="font-['Inter'] text-lg md:text-xl text-rose-100/70 leading-relaxed max-w-2xl mx-auto pt-6">
                      Thank you for making that day so special. These memories will stay with me forever.
                    </p>
                  </div>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-300/50" />
                    <Sparkles className="text-amber-300" size={20} />
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-300/50" />
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="font-['Great_Vibes'] text-4xl md:text-5xl text-rose-300"
                  >
                    Forever Grateful
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="py-20 text-center border-t border-white/5"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <Heart className="text-rose-400 fill-rose-400" size={20} />
              <p className="font-['Cormorant_Garamond'] text-lg md:text-xl text-rose-200/70 italic">
                Made with love and cherished memories
              </p>
              <Heart className="text-rose-400 fill-rose-400" size={20} />
            </div>
          </motion.div>
        </motion.footer>
      </div>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center shadow-2xl transition-colors"
              >
                <X className="text-white" size={24} />
              </motion.button>

              {/* Modal content */}
              <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image side */}
                  <div className="relative bg-gray-900 flex items-center justify-center p-8 md:p-12">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative w-full"
                    >
                      {/* Decorative frame */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-2xl blur-xl" />
                      
                      <div className="relative bg-white p-3 rounded-2xl shadow-2xl">
                        <img
                          src={images[selectedImage].src}
                          alt={images[selectedImage].alt}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </div>

                      {/* Floating hearts animation */}
                      <motion.div
                        animate={{ 
                          y: [0, -20, 0],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-6 -right-6"
                      >
                        <Heart className="text-rose-400 fill-rose-400" size={32} />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Message side */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {/* Decorative stars */}
                      <div className="flex items-center justify-center gap-2 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: 0.4 + (i * 0.1),
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            <Star className="text-amber-400 fill-amber-400" size={16} />
                          </motion.div>
                        ))}
                      </div>

                      {/* Caption as title */}
                      <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                        {images[selectedImage].caption}
                      </h3>

                      {/* Divider */}
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-300" />
                        <Heart className="text-rose-400 fill-rose-400" size={16} />
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-300" />
                      </div>

                      {/* Personal message */}
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 text-center"
                      >
                        {images[selectedImage].message}
                      </motion.p>

                      {/* Signature */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
                          <Sparkles className="text-rose-500" size={18} />
                          <p className="font-['Dancing_Script'] text-2xl text-rose-600">
                            A memory to treasure
                          </p>
                          <Sparkles className="text-rose-500" size={18} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
