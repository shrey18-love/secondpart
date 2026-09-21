import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Dreamy blurred finale that closes the scroll.
   ✍️ Edit the text inside `hugNote` to write your own feelings.
   ───────────────────────────────────────────────────────────── */
const hugNote = {
  eyebrow: "Our First Hug",
  title: "The Moment Time Stood Still",
  feeling:
    "I still remember the moment when we had our proper first hug... although we have experienced the close touch before but the first tight hug has just different vibe.. still upto today every meet i think to have that kind of hug... but somehow i am not able to... scared of people that are around us... and leads me to not feel that tight hug.. to feel the brust of emotions that i want express every time we meet... my heart really felt yours at the momment when i grab you with my hand one at your west and second around your arm... the momment i just forget about everything else my mind just saying me that nothing is more important than this momment that you are feeling now... i cant able to think that your friends are around watching us i just hugged for completly 4-5 sec there...  then you grab me back to the real word... i just really wish to hug you that long once again without any fear of anyone... and just lock in that momment...",
  sign: "— Yours, always",
};

function HugFinale() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`hug-finale ${visible ? "is-visible" : ""}`}
      aria-label="A note about our first hug"
    >
      {/* Soft blurred amber bokeh drifting behind everything */}
      <div className="hug-finale__bokeh" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      {/* Slow rising blurred hearts */}
      <div className="hug-finale__hearts" aria-hidden="true">
        <span>❤</span><span>❤</span><span>❤</span><span>❤</span><span>❤</span>
      </div>

      {/* Frosted glass love note */}
      <div className="hug-finale__card">
        <p className="hug-finale__eyebrow">{hugNote.eyebrow}</p>
        <h2 className="hug-finale__title">{hugNote.title}</h2>
        <p className="hug-finale__feeling">{hugNote.feeling}</p>
        <span className="hug-finale__sign">{hugNote.sign}</span>
      </div>

      {/* Blurred vignette so the ending melts softly, never sharp */}
      <div className="hug-finale__blur-edge" aria-hidden="true" />
    </section>
  );
}

export default function App() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);

  const frameCount = 100;

  useEffect(() => {
    let animationFrame = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const frames = new Map();
    let requestedFrame = 0;
    let renderedFrame = -1;

    const frameUrl = (index) =>
      `/frames/hugvideo_${String(index).padStart(3, "0")}.jpg`;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      drawFrame(renderedFrame < 0 ? 0 : renderedFrame);
    };

    const drawFrame = (index) => {
      const image = frames.get(index);
      if (!image?.complete || !image.naturalWidth) return;

      const scale = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight
      );

      const width = Math.ceil(image.naturalWidth * scale);
      const height = Math.ceil(image.naturalHeight * scale);

      context.fillStyle = "#0a0908";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        Math.floor((canvas.width - width) / 2),
        Math.floor((canvas.height - height) / 2),
        width,
        height
      );
      renderedFrame = index;
    };

    const loadFrame = (index) => {
      if (index < 0 || index >= frameCount || frames.has(index)) return;
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (index === requestedFrame || renderedFrame < 0) drawFrame(index);
      };
      image.src = frameUrl(index);
      frames.set(index, image);
    };

    const queueFrames = (index) => {
      for (let offset = -4; offset <= 14; offset += 1) loadFrame(index + offset);
      if (frames.size > 28) {
        for (const [key, image] of frames) {
          if (Math.abs(key - index) > 12) {
            image.src = "";
            frames.delete(key);
          }
          if (frames.size <= 24) break;
        }
      }
    };

    const update = () => {
      animationFrame = 0;
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      requestedFrame = Math.min(
        frameCount - 1,
        Math.floor(progress * (frameCount - 1))
      );

      queueFrames(requestedFrame);
      drawFrame(requestedFrame);

      if (title) {
        title.style.opacity = `${Math.max(0, 1 - progress * 3.8)}`;
        title.style.transform = `translate(-50%, calc(-50% - ${progress * 32
          }px)) scale(${1 - progress * 0.08})`;
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrame);
      frames.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  return (
    <main className="scroll-container">
      {/* Scroll-Triggered Frame Video Section */}
      <section className="scroll-video" ref={sectionRef}>
        <div className="scroll-video__sticky">
          <canvas
            ref={canvasRef}
            className="scroll-video__media"
            aria-label="OUR FIRST HUG Scroll Animation"
          />
          <div className="scroll-video__shade" aria-hidden="true" />
          <h2 ref={titleRef}>OUR FIRST HUG</h2>
          <p className="scroll-video__hint">Scroll to Experience</p>
        </div>
      </section>

      <HugFinale />
    </main>
  );
}
