import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.1,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <SiSpacex className="text-3xl mix-blend-difference" />
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Scroll slowly message */}
      <div className="absolute top-20 left-0 right-0 z-40 flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20">
          Scroll slowly
        </div>
      </div>

      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/hero-main.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/IMAGE 2026-09-04 18:20:46.jpg"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="/IMAGE 2026-09-04 18:20:49.jpg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/IMAGE 2026-09-04 18:20:51.jpg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/IMAGE 2026-09-04 18:20:55.jpg"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="bg-black px-4 py-32 text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated sparkle hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.3,
              opacity: 0,
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 200 + "%"],
              x: [null, (Math.random() - 0.5) * 100 + "%"],
              opacity: [0, 0.4, 0],
              scale: [null, Math.random() * 0.8 + 0.4],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-center text-5xl font-black uppercase text-zinc-50 relative z-10"
      >
        OUR STARTING MEETS
      </motion.h1>
      <div className="relative z-10">
        <StaggerTestimonials />
      </div>
    </section>
  );
};

const TESTIMONIALS = [
  {
    img: "/IMAGE 2026-09-04 18:20:40.jpg",
    quote: "Your Friends Birthday",
    name: "I was scared to come with you becuase i dont know that much anyone there but i just wanted to be with you so i have come and good memory",
  },
  {
    img: "/IMAGE 2026-09-04 18:20:46.jpg",
    quote: "Recharge cafe",
    name: "Its also the amazing starting date maybe the first date from your college that you bunk for me",
  },
  {
    img: "/IMAGE 2026-09-04 18:20:49.jpg",
    quote: "Hehe 😂",
    name: "The first time we went dmart together feel pretty good and even we are so fearless about someone can see us. and this photo 🤌😂",
  },
  {
    img: "/IMAGE 2026-09-04 18:20:51.jpg",
    quote: "Our Very First Date",
    name: "Its really good our first date we sit together have our fun we are so touchy in our first date 😂☺️ and then  went to eat pizzas just amazing  ✨",
  },
  {
    img: "/IMAGE 2026-09-04 18:20:55.jpg",
    quote: "Our Start",
    name: "I have so less place to describe out start but just saying this that its like a new life for me from that day",
  },
  {
    img: "/IMAGE 2026-09-04 18:20:58.jpg",
    quote: "My First Story Idea",
    name: "This is the first edit that i create to post on my insta story but not have the enough guts for it",
  },
];

const StaggerTestimonials = () => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Rotation angles for scattered card effect (alternating left/right)
  const rotations = [-8, 6, -5, 7, -6, 5];

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Cards Container */}
      <div className="relative h-[700px] w-full flex items-center justify-center">
        {TESTIMONIALS.map((testimonial, index) => {
          const offset = index - active;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          
          // Spread cards in a fan with overlap, but shift based on active card
          const cardSpacing = 180; // Cards overlap nicely
          const basePosition = (index - active) * cardSpacing;
          
          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: basePosition,
                rotate: isActive ? 0 : rotations[index],
                scale: isActive ? 1.1 : 0.95,
                opacity: 1,
                zIndex: isActive ? 50 : 10 - absOffset,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
              }}
              className={`absolute shadow-2xl ${
                isActive ? "" : "border-2 border-zinc-400"
              }`}
              style={{
                width: "420px",
                height: "550px",
                backgroundColor: isActive ? "#4F46E5" : "#ffffff",
                clipPath: isActive 
                  ? "polygon(0 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 0 100%)"
                  : "none",
              }}
            >
              <div className="flex flex-col h-full p-4">
                {/* Large image with white margin showing folded corner */}
                <div 
                  className="w-full overflow-hidden rounded-lg mb-3 relative" 
                  style={{ 
                    height: "70%",
                    clipPath: isActive 
                      ? "polygon(0 0, calc(100% - 46px) 0, 100% 46px, 100% 100%, 0 100%)"
                      : "none",
                  }}
                >
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Text content at bottom */}
                <div className="flex-1 flex flex-col justify-center px-2">
                  <p
                    className={`text-lg font-semibold leading-snug mb-2 ${
                      isActive ? "text-white" : "text-zinc-900"
                    }`}
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Attribution in italics */}
                  <p
                    className={`text-sm italic ${
                      isActive ? "text-indigo-200" : "text-zinc-600"
                    }`}
                  >
                    – {testimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows - simple icons */}
      <div className="mt-16 flex gap-4">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center transition-all hover:bg-zinc-200"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center transition-all hover:bg-zinc-200"
          aria-label="Next testimonial"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};