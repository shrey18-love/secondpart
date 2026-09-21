import SplashCursor from './SplashCursor';

export default function App() {
  return (
    <main className="blank-page">
      <SplashCursor
        DENSITY_DISSIPATION={1}
        VELOCITY_DISSIPATION={4.5}
        PRESSURE={0.35}
        CURL={9}
        SPLAT_RADIUS={0.24}
        SPLAT_FORCE={6500}
        COLOR_UPDATE_SPEED={10}
        SHADING={false}
        RAINBOW_MODE={true}
        COLOR="#A855F7"
        OPACITY={0.92}
      />

      <div className="splash-hero-container">
        <div className="splash-hero-badge">
          <span className="badge-sparkle">✨</span> A LITTLE SOMETHING FOR YOU
        </div>

        <h1 className="splash-hero-title">
          Some Colors For Your Life
          <span className="splash-hero-highlight">
            'Cause you add all the colors in mine... now it's my turn 💖
          </span>
        </h1>

        <div className="splash-hero-cta">
          <span className="cta-icon">✨</span> Move your cursor & feel it
        </div>
      </div>
    </main>
  );
}
