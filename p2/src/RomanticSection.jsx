import React, { useRef, useEffect, useState } from "react";

const MESSAGES = [
  {
    id: 1,
    tag: "❤️ NOTE #1",
    title: "The Second Time Stopped",
    text: "As we stepped closer, everything around us faded into silence. The warmth of your embrace felt like coming home after a long journey.",
  },
  {
    id: 2,
    tag: "✨ NOTE #2",
    title: "Heartbeats in Sync",
    text: "Wrapping my arms around you, I could feel your heartbeat against mine. In that split second, I knew this was where I belonged.",
  },
  {
    id: 3,
    tag: "🌙 NOTE #3",
    title: "No Words Needed",
    text: "We didn't have to say a single word. The way you held me tight spoke louder than anything ever could.",
  },
  {
    id: 4,
    tag: "🌹 NOTE #4",
    title: "My Safe Haven",
    text: "That first hug wasn't just a physical touch — it was a promise of warmth, safety, and a love that stays forever.",
  },
];

export default function RomanticSection() {
  const stageRef = useRef(null);
  const noteRefs = useRef([]);
  const [ropePaths, setRopePaths] = useState([]);

  /* Recalculate rope SVG paths whenever layout changes */
  useEffect(() => {
    const computeRopes = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const stageRect = stage.getBoundingClientRect();
      const anchorX = stageRect.width / 2;
      const anchorY = stageRect.height - 20;

      const paths = noteRefs.current.map((el) => {
        if (!el) return "";
        const r = el.getBoundingClientRect();
        const noteBottomX = r.left - stageRect.left + r.width / 2;
        const noteBottomY = r.top - stageRect.top + r.height + 6;

        /* Smooth cubic bezier: leave note going straight down,
           then curve gently toward anchor */
        const midY = noteBottomY + (anchorY - noteBottomY) * 0.45;
        return `M ${noteBottomX} ${noteBottomY}
                C ${noteBottomX} ${midY},
                  ${anchorX} ${anchorY - (anchorY - midY) * 0.5},
                  ${anchorX} ${anchorY}`;
      });
      setRopePaths(paths);
    };

    computeRopes();
    window.addEventListener("resize", computeRopes);
    /* Recalculate once fonts/layout settle */
    const t = setTimeout(computeRopes, 300);
    return () => {
      window.removeEventListener("resize", computeRopes);
      clearTimeout(t);
    };
  }, []);

  return (
    <section className="romantic-section">
      <div className="romantic-bg-glow" />
      <div className="romantic-bg-glow romantic-bg-glow--b" />

      <div className="floating-notes-stage" ref={stageRef}>
        {/* SVG ropes — drawn from each note's bottom center → anchor */}
        <svg className="ropes-svg" aria-hidden="true">
          {ropePaths.map((d, i) =>
            d ? (
              <path
                key={i}
                className={`rope rope--${i}`}
                d={d}
                fill="none"
                stroke="rgba(244, 162, 97, 0.28)"
                strokeWidth="1.5"
              />
            ) : null
          )}
        </svg>

        {/* Floating note cards */}
        {MESSAGES.map((msg, i) => (
          <div
            key={msg.id}
            ref={(el) => (noteRefs.current[i] = el)}
            className={`floating-note floating-note--${i}`}
          >
            <div className="floating-note__tag">{msg.tag}</div>
            <h3 className="floating-note__title">{msg.title}</h3>
            <p className="floating-note__text">"{msg.text}"</p>
            <div className="floating-note__knot" />
          </div>
        ))}

        {/* Central anchor knot at bottom */}
        <div className="anchor-knot">
          <div className="anchor-knot__ring" />
          <div className="anchor-knot__dot" />
        </div>
      </div>
    </section>
  );
}
