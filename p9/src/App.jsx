import { useEffect, useRef, useState } from 'react';
import './App.css';

const features = [
  {
    id: 1,
    title: "Sleepy You",
    emoji: "😴",
    preview: "Click to read more...",
    description: "The way you are sleepy around me 🥹🥹😴💤 make me feel so good that you are safe around me you consider me as the man that you can trust no matter what you say but i cann see it and it made me blush and feel good ☺️🫠🫂😘❤️ and i just love it its my dream one day you are in my arms and we just sleep without thinking anything else 🥹🫂",
  },
  {
    id: 2,
    title: "Excited You",
    emoji: "✨",
    preview: "Click to read more...",
    description: "First i thought its very rare that you are excited but now i understand i missjudge you so much 🥹🫂🫠You are excited every time you see me you are excited every time i come close to you 🥰☺️ now i am able to see that on your face its hard to understand your emotions 🫠but somehow i managed it and i love too see that on your face",
  },
  {
    id: 3,
    title: "Silly You",
    emoji: "🎭",
    preview: "Click to read more...",
    description: "I am blushing to write you this but sometime i really like you tease me in silly way 🥹🫂😂 its so funny and irritating at the same time how you make fun of me its less when our relatioship started but now we are so confortable so its happening offen and i really loved it 🥹🫠🫠😘",
  },
  {
    id: 4,
    title: "Caring You",
    emoji: "💝",
    preview: "Click to read more...",
    description: "You are the first that come up in my mind when something happen to me like i am sick or i fell or something hurts me 🥹🫂✨ you take that place inside my heart and mind 🥹and the way you take care of me you know i needed treat like baby so you do 🥹✨ and find the solution that you can and somehow its working also 🥹🤌✨😘🫂",
  },
  {
    id: 5,
    title: "Quiet You",
    emoji: "🌙",
    preview: "Click to read more...",
    description: "I feel sad when i make you angry 🫠🫂✨ i really dont want to do that i see you are quite. its wrong but in quitness also i blend into your layer of beauty and simplicity i carried away with the topic and all my focus just go to make  you reply 🥹❤️but in the angry mood quite mood you do care about me and that the love that i felt from you ",
  },
  {
    id: 6,
    title: "Emotional You",
    emoji: "💭",
    preview: "Click to read more...",
    description: "No matter how much you hide but i know that you are so so much emotional 🥹🫂😘❤️you just like my little child who gets emotional on normal thing but that child is inside the big girl so you hide your emotional side 🤦🏼♂️🙄 but i know and now i can see it also you not clingy like me in emotions but you are clingy enough to make me feel butterflies and that more than enough for me 🥹😘❤️",
  },
];

function DemoPanel({ feature, onClick }) {
  const panelRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current) return;

      const panel = panelRef.current;
      const rect = panel.getBoundingClientRect();
      const scrollContainer = panel.closest('.right-column');
      
      if (!scrollContainer) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      
      // Calculate panel position relative to container
      const panelTop = rect.top - containerRect.top;
      const panelHeight = rect.height;
      
      // Start fading when panel is anywhere in the top 40% of container
      const fadeStartZone = containerRect.height * 0.4;
      
      if (panelTop < 0) {
        // Panel top has passed the container top
        const scrolledPast = Math.abs(panelTop);
        const fadeProgress = Math.min(scrolledPast / (panelHeight * 0.6), 1);
        
        // Gradual fade as it scrolls up
        const newOpacity = 1 - fadeProgress;
        setOpacity(Math.max(0, newOpacity));
      } else if (panelTop < fadeStartZone) {
        // Panel is entering the fade zone from below
        const fadeProgress = 1 - (panelTop / fadeStartZone);
        
        // Gentle fade starts early
        const newOpacity = 1 - (fadeProgress * 0.3);
        setOpacity(Math.max(0.7, Math.min(1, newOpacity)));
      } else {
        // Panel is below fade zone - fully visible
        setOpacity(1);
      }
    };

    const scrollContainer = panelRef.current?.closest('.right-column');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      ref={panelRef}
      className="demo-panel"
      style={{ opacity }}
      onClick={() => onClick(feature)}
    >
      <div className="demo-content">
        <div className="demo-emoji">{feature.emoji}</div>
        <h3 className="demo-title">{feature.title}</h3>
        <p className="demo-description">{feature.preview}</p>
      </div>
    </div>
  );
}

function Modal({ feature, onClose }) {
  if (!feature) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-emoji">{feature.emoji}</div>
        <h2 className="modal-title">{feature.title}</h2>
        <p className="modal-description">{feature.description}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="app">
      <div className="container">
        {/* Left Column - Static Text */}
        <div className="left-column">
          <div className="badge">ANNIVERSARY SPECIAL</div>
          <h1 className="headline">
            Every version of<br />
            you i love
          </h1>
          <p className="body-text">
            Every side of you is a reason I fell in love. From your morning sleepy eyes to your confident smile, each version of you makes my heart skip a beat.
          </p>
        </div>

        {/* Right Column - Scrollable Demo Panels */}
        <div className="right-column">
          <div className="demo-panels">
            {features.map((feature) => (
              <DemoPanel 
                key={feature.id} 
                feature={feature}
                onClick={setSelectedFeature}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <Modal 
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
}
