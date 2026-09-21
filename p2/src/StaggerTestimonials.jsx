import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "The most beautiful scroll experience I've seen. The frames run incredibly smooth without any lag. Absolutely stunning work.",
    author: "Alex Jenkins",
    role: "UX Designer",
  },
  {
    text: "It feels like an interactive movie. The way the video sticks and scrubs through as you scroll is flawless.",
    author: "Sarah Lin",
    role: "Creative Director",
  },
  {
    text: "I was looking for this exact effect for my portfolio. This implementation is by far the most performant approach.",
    author: "David O.",
    role: "Frontend Developer",
  },
  {
    text: "Wow! Just wow! The golden tones and the smooth frame rendering make it a truly romantic and cinematic experience.",
    author: "Emma Stone",
    role: "Photographer",
  },
  {
    text: "The technical execution here is top notch. Preloading the frames in a Map and drawing to a Canvas was the right call.",
    author: "Michael T.",
    role: "Software Engineer",
  },
  {
    text: "I am amazed by the attention to detail. Every pixel feels intentional and perfectly placed.",
    author: "Jessica R.",
    role: "Product Manager",
  }
];

export default function StaggerTestimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    },
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="testimonials-header"
        >
          <h3 className="testimonials-title">What people are saying</h3>
          <p className="testimonials-subtitle">Don't just take our word for it.</p>
        </motion.div>

        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div key={idx} variants={itemVariants} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author-block">
                <div className="testimonial-avatar">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="testimonial-name">{testimonial.author}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
