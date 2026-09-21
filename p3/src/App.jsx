import { useEffect, useState } from 'react';
import AeroShards from './AeroShards';
import writing from '../writing?raw';

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5 + (i * 17) % 11) % 94 + 3}%`,
  size: `${0.7 + (i % 4) * 0.25}rem`,
  duration: `${11 + (i % 6) * 2.5}s`,
  delay: `-${(i * 2.3) % 12}s`,
  char: i % 3 === 0 ? '✨' : i % 3 === 1 ? '💖' : '💕',
  opacity: 0.35 + (i % 4) * 0.12,
}));

function SparkleRain() {
  return (
    <div className="sparkle-rain" aria-hidden="true">
      {SPARKLES.map((s) => (
        <span
          key={s.id}
          className="sparkle-particle"
          style={{
            left: s.left,
            fontSize: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
            opacity: s.opacity,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = event => event.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <main className="aeroshards-page">
      <div className="aeroshards-background">
        <AeroShards
          backgroundColor="#0e0b12"
          shardColor="#896ABD"
          accentColor="#A855F7"
          placement="full"
          flow="stream"
          material="pearl"
          detail="balanced"
          effect="none"
          scale={1}
          spread={1}
          depth={1}
          speed={0.8}
          spin={1}
          interaction="repel"
          density={1.5}
          shardSize={1.1}
          stretch={1}
          turbulence={1}
          glow={1.2}
          edgeSoftness={2}
          bloom={0.6}
          grain={0.06}
          chromaticAberration={0.008}
          transitionDuration={1}
          interactionRadius={1.6}
          interactionStrength={0.6}
          rippleIntensity={1.2}
          holdToGather
          paused={false}
        />
      </div>

      <div className="aeroshards-page__shade" aria-hidden="true" />

      {/* ── Soft Sparkle Rain Layer ── */}
      <SparkleRain />

      <div className="aeroshards-page__hero">
        <span className="aeroshards-page__eyebrow">OUR SWEETEST MOMENT</span>
        <h1 className="aeroshards-page__title">
          Sharing My Feelings
          <span className="aeroshards-page__highlight">About Our First Kiss ☺️❤️</span>
        </h1>

        {/* ── Shimmering Glass Pill Button ── */}
        <button
          className="secret-message-btn"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <span className="secret-message-btn__icon">💋</span>
          <span className="secret-message-btn__text">Read My Secret Message</span>
          <span className="secret-message-btn__sparkle">✨</span>
        </button>
      </div>

      <p className="aeroshards-page__label">Click and Hold to Gather the Shards</p>

      {isOpen && (
        <div className="love-modal" role="presentation" onClick={() => setIsOpen(false)}>
          <section
            className="love-modal__card"
            role="dialog"
            aria-modal="true"
            aria-label="A message"
            onClick={event => event.stopPropagation()}
          >
            <button
              className="love-modal__close"
              type="button"
              aria-label="Close message"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <p className="love-modal__eyebrow">From my heart</p>
            <div className="love-modal__writing">{writing}</div>
          </section>
        </div>
      )}
    </main>
  );
}
