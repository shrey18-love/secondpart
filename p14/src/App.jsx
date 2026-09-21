import { useMemo, useState, useEffect } from 'react';
import Hyperspeed from '../Hyperspeed.jsx';
import { hyperspeedPresets } from '../preset.js';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const effectOptions = useMemo(
    () => ({
      ...hyperspeedPresets.one,
      speedUp: 3.5,
      fovSpeedUp: 145
    }),
    []
  );

  useEffect(() => {
    const closeOnEscape = event => event.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <main className="hyperspeed-page">
      <Hyperspeed effectOptions={effectOptions} />
      <div className="hyperspeed-page__overlay" aria-hidden="true" />

      <div className="heartbeat-content">
        <h1 className="heartbeat-heading">
          <span className="heartbeat-my">MY</span>
          <span className="heartbeat-words">HEARTBEATS</span>
        </h1>

        <div className="heartbeat-ecg-wrapper">
          <div className="heartbeat-ecg" aria-hidden="true">
            <svg viewBox="0 0 400 32" preserveAspectRatio="none">
              <path
                className="heartbeat-ecg__path"
                d="M0 16 H140 L148 4 L158 28 L168 8 L178 22 L186 16 H400"
              />
            </svg>
          </div>

          <div className="heartbeat-trigger">
            <button
              type="button"
              className="heartbeat-heart-btn"
              aria-label="Open message"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              💖
            </button>
            <span className="heartbeat-click-me">click me</span>
          </div>
        </div>

        <p className="heartbeat-sub">
          touch and hold to feel the speed of my heartbeats
        </p>
      </div>

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
            <p className="love-modal__eyebrow">From My Heart 💓</p>
            <div className="love-modal__writing">
              <p>
                Every single touch to your body made me shiver.. every time i try to create a contect with you weather its a your cheeks, hairs or waist.. I feel the kind of feeling that it never had...</p>
              <p>
                The first time i try to touch you i was so scared thinking if you think me like i am pervert.. but when i touched you... my hearbeats just stop for a bit a slight feeling good pain felt in my heart then its beats so fast the feeling is like my heat is a car and you are the driver like engine takes a break and then start just the same❤️
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
