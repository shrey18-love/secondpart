import { useEffect, useState } from 'react';
import RippleDistortion from '../RippleDistortion.jsx';
import writing from '../writing.txt?raw';

const wallpaperImage =
  'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = event => event.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <main
      className="ripple-wallpaper"
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`);
      }}
    >
      <RippleDistortion
        src={wallpaperImage}
        brushSize={185}
        strength={0.2}
        swirl={1}
        rings={4}
        grayscale
        spread={5}
        fade={3}
        spacing={15}
        dispersion={0}
        glint={0}
        tint="#a855f7"
        tintAmount={0.1}
        highlightColor="#ffffff"
        trigger="both"
        clickStrength={2}
        quality="medium"
        enabled
      />
      <div className="ripple-wallpaper__shade" aria-hidden="true" />
      <button className="ripple-wallpaper__button" type="button" aria-label="Open message" onClick={() => setIsOpen(true)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21.1 10.55 19.8C5.4 15.14 2 12.06 2 8.3 2 5.22 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.22 22 8.3c0 3.76-3.4 6.84-8.55 11.51L12 21.1Z" />
        </svg>
      </button>
      <p className="ripple-wallpaper__label">Move across the screen</p>
      {isOpen && (
        <div className="love-modal" role="presentation" onClick={() => setIsOpen(false)}>
          <section className="love-modal__card" role="dialog" aria-modal="true" aria-label="A message" onClick={event => event.stopPropagation()}>
            <button className="love-modal__close" type="button" aria-label="Close message" onClick={() => setIsOpen(false)}>×</button>
            <p className="love-modal__eyebrow">From my heart</p>
            <div className="love-modal__writing">{writing}</div>
          </section>
        </div>
      )}
    </main>
  );
}
