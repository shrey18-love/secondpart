import { useState } from 'react';
import GlowCursor from '../GlowCursor.jsx';
import loveLetter from '../writing?raw.js';

export default function App() {
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <main className="demo">
      <section className="demo__glow">
        <GlowCursor
          color="#67E8F9"
          secondaryColor="#A78BFA"
          trailLength={40}
          trailWidth={8}
          trailTaper={0.8}
          followSpeed={0.16}
          glowIntensity={1.9}
          glowSpread={1.2}
          hotspot={0.65}
          brightness={1.25}
          opacity={1}
          pulseSpeed={1.1}
          noiseStrength={0.035}
          idleFade
          idleTimeout={700}
          fadeDuration={900}
          blendMode="screen"
        >
          <div className="demo__content">
            <h1>MY LOVE</h1>
            <p className="demo__copy">Move your cursor to paint the canvas with light.</p>
          </div>

          <button
            className="love-button"
            type="button"
            aria-label="Open love note"
            aria-expanded={isNoteOpen}
            onClick={() => setIsNoteOpen(true)}
          >
            ♥
          </button>

          {isNoteOpen && (
            <div className="love-modal" role="presentation" onClick={() => setIsNoteOpen(false)}>
              <section
                className="love-note"
                role="dialog"
                aria-modal="true"
                aria-labelledby="love-note-title"
                onClick={event => event.stopPropagation()}
              >
                <button className="love-note__close" type="button" aria-label="Close note" onClick={() => setIsNoteOpen(false)}>×</button>
                <p className="love-note__eyebrow">A NOTE FOR YOU</p>
                <h2 id="love-note-title">I AM ALL YOURS ❤️</h2>
                <p className="love-note__message">{loveLetter}</p>
              </section>
            </div>
          )}
        </GlowCursor>
      </section>

    </main>
  );
}
