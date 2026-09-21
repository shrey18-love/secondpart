import React from "react";
import { motion } from "framer-motion";
import selfie from "./assets/memory-selfie.jpg";
import sunsetHug from "./assets/memory-sunset-hug.jpg";
import rooftopLaugh from "./assets/memory-rooftop-laugh.jpg";
import flyingKite from "./assets/memory-flying-kite.jpg";

/* Real kite cut-outs (transparent PNGs, hotlinked from freepnglogos) */
const KITES = {
  red: "https://www.freepnglogos.com/uploads/kite-png/kite-png-transparent-image-pngpix-9.png",
  long: "https://www.freepnglogos.com/uploads/kite-png/kite-png-images-pngpix-10.png",
  colorful: "https://www.freepnglogos.com/uploads/kite-png/colorful-kite-clip-art-clkerm-vector-clip-art-33.png",
  blue: "https://www.freepnglogos.com/uploads/kite-png/kite-png-transparent-image-pngpix-2.png",
  orange: "https://www.freepnglogos.com/uploads/kite-png/orange-kite-clip-art-clkerm-vector-clip-art-online-17.png",
};

/* ── A flying kite: real cut-out image + sway animation + optional string ── */
function Kite({ src, className = "", style, withString = false }) {
  return (
    <div className={`kite ${className}`} style={style} aria-hidden="true">
      <img
        className="kite__img"
        src={src}
        alt=""
        draggable="false"
        onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
      />
      {withString && (
        <svg className="kite__string" viewBox="0 0 60 400" preserveAspectRatio="none">
          <path
            d="M30 0 C 10 90, 50 180, 22 300 C 12 350, 34 380, 26 400"
            fill="none"
            stroke="rgba(35, 70, 105, 0.35)"
            strokeWidth="1.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}

function Cloud({ className = "", style }) {
  return <div className={`cloud ${className}`} style={style} aria-hidden="true" />;
}

const MEMORIES = [
  {
    src: selfie,
    title: "You & Me",
    caption: "Seeing beautiful sky sitting beside eachother is like a dream for me.",
    rotate: -3,
  },
  {
    src: flyingKite,
    title: "The One That You Flew",
    caption: "Even though i am not good at flying kite but you gave me your which already touches the cloud.",
    rotate: 2.5,
  },
  {
    src: rooftopLaugh,
    title: "Fun",
    caption: "Fun, laugh and enjoyment that we had that day was just amazing. You made me mad in your love thatday",
    rotate: -2,
  },
  {
    src: sunsetHug,
    title: "One of the best photo",
    caption: "We have so less couple photo and this was my favourite one",
    rotate: 3,
  },
];

const rise = {
  hidden: { opacity: 0, y: 52 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function App() {
  return (
    <main className="kite-page">
      {/* ── Sky hero with flying kites ── */}
      <header className="sky-hero">
        <div className="sky-hero__sun" aria-hidden="true" />

        <Cloud className="cloud--1" />
        <Cloud className="cloud--2" />
        <Cloud className="cloud--3" />

        {/* Big held kite, left */}
        <Kite src={KITES.long} withString style={{ top: "6%", left: "4%", width: "10rem" }} />
        <Kite
          className="kite--drift"
          src={KITES.red}
          withString
          style={{ top: "16%", left: "-12%", width: "7.5rem", animationDuration: "58s", animationDelay: "-14s" }}
        />
        <Kite src={KITES.long} withString style={{ top: "7%", right: "8%", width: "9rem" }} />
        <Kite
          className="kite--drift"
          src={KITES.colorful}
          style={{ top: "38%", left: "-12%", width: "5.5rem", animationDuration: "74s", animationDelay: "-46s" }}
        />
        <Kite src={KITES.blue} style={{ top: "44%", left: "16%", width: "6rem" }} />
        <Kite src={KITES.colorful} style={{ top: "26%", right: "30%", width: "3.4rem" }} />
        <Kite src={KITES.orange} style={{ top: "58%", right: "18%", width: "4.2rem" }} />
        <Kite src={KITES.red} style={{ top: "64%", left: "7%", width: "3.6rem" }} />
        <Kite
          className="kite--drift"
          src={KITES.blue}
          style={{ top: "70%", left: "-12%", width: "4.8rem", animationDuration: "90s", animationDelay: "-60s" }}
        />

        <div className="sky-hero__content">
          <motion.p className="sky-hero__eyebrow" initial="hidden" animate="show" variants={rise}>
            Uttarayan
          </motion.p>
          <motion.h1 initial="hidden" animate="show" variants={rise}>
            Kites, Clouds <span>&amp; You</span>
          </motion.h1>
          <motion.p className="sky-hero__sub" initial="hidden" animate="show" variants={rise}>
            A sky full of patang, rooftop winds, and my favourite person beside me.
          </motion.p>
        </div>

        <p className="sky-hero__hint">Scroll to relive our day</p>
      </header>

      {/* ── Memory polaroids ── */}
      <section className="memories">
        <Cloud className="cloud--4" />
        <Kite src={KITES.blue} style={{ top: "4%", right: "6%", width: "5rem" }} />
        <Kite src={KITES.orange} style={{ top: "12%", left: "5%", width: "4rem" }} />
        <Kite src={KITES.long} style={{ top: "58%", right: "3%", width: "5.5rem" }} />
        <Kite
          className="kite--drift"
          src={KITES.colorful}
          style={{ top: "32%", left: "-12%", width: "4.5rem", animationDuration: "70s", animationDelay: "-25s" }}
        />

        <motion.div className="memories__head" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={rise}>
          <p className="memories__eyebrow">Our favourite frames</p>
          <h2>Beautiful day of my life</h2>
        </motion.div>

        <div className="memories__grid">
          {MEMORIES.map((m, i) => (
            <motion.figure
              key={m.title}
              className="polaroid"
              style={{ "--tilt": `${m.rotate}deg` }}
              initial={{ opacity: 0, y: 64, rotate: m.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: m.rotate }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: (i % 2) * 0.12 }}
            >
              <span className="polaroid__tape" aria-hidden="true" />
              <div className="polaroid__frame">
                <img src={m.src} alt={m.title} loading="lazy" />
              </div>
              <figcaption>
                <strong>{m.title}</strong>
                <span>{m.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ── Closing quote under a deeper sky ── */}
      <section className="sky-quote">
        <Kite className="kite--drift" src={KITES.orange} style={{ top: "12%", left: "-12%", width: "5.5rem", animationDuration: "66s", animationDelay: "-30s" }} />
        <Kite src={KITES.blue} withString style={{ top: "16%", right: "9%", width: "6.5rem" }} />
        <Kite src={KITES.red} style={{ top: "52%", left: "8%", width: "4.2rem" }} />
        <Kite
          className="kite--drift"
          src={KITES.long}
          style={{ top: "58%", left: "-12%", width: "5rem", animationDuration: "80s", animationDelay: "-50s" }}
        />
        <motion.blockquote initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={rise}>
          <p>
            I just want to be happy with you like the this day i was.. 🥹
            This was the perfect day of my life 🤌✨
            You gave me kiss.. you accepted my hug
            unforgivable day of my life ❤️
          </p>
          <span>— our uttarayan, forever</span>
        </motion.blockquote>
      </section>

      <footer className="kite-footer">
        <p>Made with love  ❤</p>
      </footer>
    </main>
  );
}
