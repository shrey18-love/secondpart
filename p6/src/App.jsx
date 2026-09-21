import React from "react";
import { motion } from "framer-motion";
import heroParty from "./assets/hero-party.png";
import herGarden from "./assets/bday-her-garden.jpg";
import cakePhoto from "./assets/bday-cake.jpg";
import bouquet from "./assets/bday-bouquet.jpg";
import myLove from "./assets/bday-my-love.jpg";

/* Real transparent PNG cut-outs (hotlinked from freepnglogos) */
const PNG = {
  rose: "https://www.freepnglogos.com/uploads/rose-png/rose-png-download-valentine-day-3.png",
  roseStem:
    "https://www.freepnglogos.com/uploads/rose-png/beautiful-red-rose-png-clipart-8.png",
};

/* Transparent png with a graceful hide-if-broken fallback */
function Cutout({ src, className = "", style, alt = "" }) {
  return (
    <img
      className={`cutout ${className}`}
      src={src}
      alt={alt}
      draggable="false"
      style={style}
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden";
      }}
    />
  );
}

const POSTCARDS = [
  { src: cakePhoto, note: "the cake that wore your name", tilt: "-7deg", pos: "pc--1" },
  { src: bouquet, note: "flowers hid your face, not your smile", tilt: "5deg", pos: "pc--2" },
  { src: myLove, note: "us — in every universe", tilt: "9deg", pos: "pc--3" },
];

const rise = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function App() {
  return (
    <main className="bday-page">
      {/* ── 1 · Party-frame hero with the big statement ── */}
      <header className="hero" style={{ backgroundImage: `url(${heroParty})` }}>
        <motion.div className="hero__text" initial="hidden" animate="show" variants={rise}>
          <p className="hero__eyebrow">a memory we keep replaying</p>
          <h1>
            Let's remember the <span>birthday</span> of yours that we spent together
          </h1>
          <p className="hero__sub">you, me, one cake, a bunch of flowers — the best day of my year.</p>
          <span className="hero__cue">scroll to replay it ↓</span>
        </motion.div>
      </header>

      {/* ── 2 · The birthday girl, split portrait ── */}
      <section className="portrait">
        <motion.figure
          className="portrait__photo"
          initial={{ opacity: 0, x: -70, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={herGarden} alt="Nandini smiling in the garden on her birthday" />
        </motion.figure>

        <motion.div
          className="portrait__text"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={rise}
        >
          <p className="eyebrow">the birthday girl</p>
          <h2>Everything soft, everything bright — that's you.</h2>
          <p>
            The way you shine on your birthday it left its shining inside me 
            and the way your smile i see on that day is amazing not matter its because of
            me or some one else.
          </p>
          <Cutout src={PNG.rose} className="portrait__rose" />
        </motion.div>
      </section>

      {/* ── 3 · Scattered postcards from the day ── */}
      <section className="postcards">
        <motion.div
          className="postcards__head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={rise}
        >
          <p className="eyebrow">kept from that day</p>
          <h2>Pictures From Your Birthday</h2>
        </motion.div>

        <div className="postcards__board">
          {POSTCARDS.map((p, i) => (
            <motion.figure
              key={p.note}
              className={`postcard ${p.pos}`}
              style={{ "--tilt": p.tilt }}
              initial={{ opacity: 0, y: 80, rotate: p.tilt }}
              whileInView={{ opacity: 1, y: 0, rotate: p.tilt }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.12 }}
            >
              <img src={p.src} alt={p.note} loading="lazy" />
              <figcaption>{p.note}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ── 4 · A handwritten note ── */}
      <section className="note">
        <motion.div
          className="note__card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={rise}
        >
          <Cutout src={PNG.roseStem} className="note__rose" />
          <p className="eyebrow">My Thoughts</p>
          <p className="note__body">
            I am so confused what to wear on your birthday 
            And when i am confused i come up with the shitiest thing 
            that you also know. so my outfit was not good that day but 
            Its a first time i do some skin care for someone 
            and the flower idea is in my mind your friend help me with it 
            I wanted to give big flower bouquet but its not possible in that time 
            But it was good experience on your birthday
          </p>
          <span className="note__sign">— yours, always</span>
        </motion.div>
      </section>

      <footer className="bday-footer">
        <p>A time capsule of Nandini's birthday · kept here with love ❤</p>
      </footer>
    </main>
  );
}
