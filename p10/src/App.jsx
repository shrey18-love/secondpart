import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import './App.css'

// Content data - map highlighted words to text messages (no photos)
const letterContent = {
  highlights: {
    "morning": {
      message: "My start of the day i just got up from the bed and see your good morning message i feel energatic 🥹🫂❤️ no wornder what your mood sometimes its full of love \"Gooooddd moooorrnnniiiinggg my love..🤗😘❤️\" and sometimes less energy but full of love \"Goood moorniing..❤️✨️\" and some times tired \"Good morning..🤧🤧\" and some times you are angry so 👀\"Good morning 😁❤️\"but no matter what i feel you present with that message 🥹✨"
    },
    "night": {
      message: "The end of the day ✨💤  seeing your good night message add some peace in mind and body no wonder its also on your mood 🥹😂\nSIMPLE - Good night.. 🫂\nCARING - Goood nightt..🤗 bane tetlu vahelu patavje..🫠\nLOVING - Good night.. 🤗❤️\nANGRY 👀 - Goood night..🤗 love you.. ❤️😁"
    },
    "good boii": {
      message: "And uff sometime you use this beautifull cute word made me really feel a little good boii of yours 🥹❤️ no wonder if its appreciating \"🤦🏻♀️😂 my talented boii..🤗😘😂\" angry \"Hmm good boii.. 🤗🔪\"  silly \"Awwww good boii 🥹🫂😂\" and some time i made you to tell it \"Hmmm good boii 🙄\" and vary rare you tell by itself and its so romantic 🥹😘 \"Goood boii 🫂😘\""
    },
    "loveyou": {
      message: "Your every loveyou message holds the same importance for me as you do 🥹🫂❤️ some time we had a fight but you havent forget to tell me \"Hmmm hmmm love youu moreee..🙄🙄\" and some time you are teasing me hunhhh 😒 although its good 🥹😂 \"Awww aatlu love you kidha pachi more bhi kav chu tu.. how sweet..🥹🥹😂\" some time its normal \"Love you toooo...🫠🙂↕️🫂❤️\" and its very very rare when you became flirty and tell me this \"Love you more. 😉❤️🙂↔️\" it feels so good 🥹☺️ i got butterflies in my whole body 🥹😂"
    },
    "birthday": {
      message: "The way you suprised me on my birthdya was just amazing 🥹❤️and you inocent massage at the start was so cute \"Happiest birthday my dearest darling.. 🤗😘🫂😂 Thank you for making my days softer, happier, and full of laughter. Hope your year will be as amazing as you are..🫂✨I'm really lucky to have you in my life 🫶🏻🫠🫠 tara sivay kon j saharo banet maro 🥹 joke mane jarur bhi nahi 💁🏻♀️✨️ but afsos ke tu fasai gayo..😼😂.. aakhir kar 18 thaya khara..🤭🫂 mwahh..😘\""
    },
    "new year": {
      message: "The new year massage made my year so joyfull at the start 🥹❤️🫂Happpiie Neww Yearr mere pyyarre shaitan cutu bacche.. 🎊🎉🎆✨️🤗🫂😂 thank you for always being there when I need you pachi bhale tu kasu kam ma to na aavu 😂 pan bas tu exist karu ej bav che.. 😌🙂↔️ 2025 ma tari girlfriend bani jais evu kasu gaya varshe aa divse vicharyu notu..😂 but ave bani j gai chu to.... sahan kari lais thodu..🫠 aagad nu varsh bav khatarnak rahese tara mate..😈 aatla sara bf ne heran karis to paap to nai lage ne..🥹 bhale lagtu... pan hu to nai chhodvani..😈🙂↔️😂 and always be happy be safe.. dhyan rakhje potanu.. ane hann amdavad ma hath mathi nikdi na jato.. 😏 biji chokrio ni najar na lage.. 🧿🧿🥹🙂↕️ Love you so much.. 🫂❤️✨️"
    },
    "laughter": {
      message: "The little little prank that you always do had me some time and sometime i figure it out 😉😂 but this one just had i really tought it was your mom for some time 🥹🤦🏼♂️😂\nDiku ni mummy bolu chu\nOh natak lage 6\nTu 12 ma standard vado j shrey ôu ne\nAve kem javan bathi apto\nJavab\nAbe yrrr...\nMummy e tara messages joi lidha..."
    }
  }
}

function App() {
  const [selectedWord, setSelectedWord] = useState(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const openPopup = (wordKey) => {
    setSelectedWord(wordKey)
    setCurrentPhotoIndex(0)
  }

  const closePopup = () => {
    setSelectedWord(null)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedWord && letterContent.highlights[selectedWord]) {
      const photos = letterContent.highlights[selectedWord].photos
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }
  }

  const prevPhoto = () => {
    if (selectedWord && letterContent.highlights[selectedWord]) {
      const photos = letterContent.highlights[selectedWord].photos
      setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }
  }

  const renderLetterText = () => {
    return (
      <>
        <p>My Dearest,</p>
        <p>
          Every day somehow feels a little more beautiful because of you. 
          From the first thought of you in the <span className="highlight" onClick={() => openPopup("morning")}>morning</span> to the last smile you bring me at <span className="highlight" onClick={() => openPopup("night")}>night</span>, you have quietly become such an important part of my everyday life.
        </p>
        <p>
          It's the little things about you that mean the most to me — your random messages, your cute talks, your silly little moments, 
          and especially the way you call me your <span className="highlight" onClick={() => openPopup("good boii")}>good boii</span>. 
          Somehow, those tiny things stay in my heart longer than you probably realize.
        </p>
        <p>
          Even your simple <span className="highlight" onClick={() => openPopup("loveyou")}>loveyou</span> means so much to me. 
          It may be just a few words, but when they come from you, they can make an ordinary day feel completely different.
        </p>
        <p>
          And when special days come around — a festival, your <span className="highlight" onClick={() => openPopup("birthday")}>birthday</span>, or the beginning of a <span className="highlight" onClick={() => openPopup("new year")}>new year</span> — 
          what makes them special isn't the celebration itself. 
          It's knowing that I get another memory with you, 
          another reason to smile, and another moment that I can keep close to my heart.
        </p>
        <p>
          I don't need perfect days or anything extraordinary. I just want more little moments with you — 
          more <span className="highlight" onClick={() => openPopup("laughter")}>laughter</span>, more silly conversations, 
          more memories, 
          and more days where I get to remind you how much you matter to me.
        </p>
        <p>
          Because somewhere between all these ordinary days,<br />
          you became my favorite part of them. ❤️
        </p>
      </>
    )
  }

  return (
    <div className="letter-container">
      {/* Large decorative flower - top left corner */}
      <motion.div 
        className="flower flower-topleft"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        🌸
      </motion.div>

      {/* Large decorative flower - bottom right corner */}
      <motion.div 
        className="flower flower-bottomright"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        🌺
      </motion.div>

      {/* Medium flower - bottom left */}
      <motion.div 
        className="flower flower-bottomleft"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        🌷
      </motion.div>

      {/* Top right flower */}
      <motion.div 
        className="flower flower-topright"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1, rotate: 20 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        🌹
      </motion.div>

      {/* Static hearts at top - asymmetric placement */}
      <motion.div
        className="heart heart-top-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.65, scale: 1, rotate: -15 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        ♥
      </motion.div>
      <motion.div
        className="heart heart-top-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.65, scale: 1, rotate: 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        ♥
      </motion.div>
      <motion.div
        className="heart heart-top-3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.65, scale: 1, rotate: -10 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        ♥
      </motion.div>

      {/* Additional hearts scattered around */}
      <motion.div
        className="heart heart-left-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1, rotate: 15 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        ♥
      </motion.div>
      <motion.div
        className="heart heart-right-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.55, scale: 1, rotate: -20 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        ♥
      </motion.div>
      <motion.div
        className="heart heart-bottom-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 10 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        ♥
      </motion.div>

      {/* Small accent flowers */}
      <motion.div
        className="flower flower-accent-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.55, scale: 1, rotate: 25 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        🌼
      </motion.div>
      <motion.div
        className="flower flower-accent-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1, rotate: -20 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        🌻
      </motion.div>
      <motion.div
        className="flower flower-accent-3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.52, scale: 1, rotate: 15 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        🌼
      </motion.div>
      <motion.div
        className="flower flower-accent-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.48, scale: 1, rotate: -30 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        🌻
      </motion.div>

      {/* Sparkles */}
      <motion.div
        className="sparkle sparkle-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="sparkle sparkle-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="sparkle sparkle-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="sparkle sparkle-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.75, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
      >
        ✨
      </motion.div>

      {/* Letter Paper */}
      <motion.div 
        className="letter-paper"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="letter-header">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            September 26, 2026
          </motion.div>
        </div>
        
        <motion.div 
          className="letter-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {renderLetterText()}
        </motion.div>

        <div className="letter-decoration">
          <span>♥</span>
          <span>✿</span>
          <span>♥</span>
        </div>
      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedWord && letterContent.highlights[selectedWord] && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="popup-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closePopup}>×</button>
              
              <div className="popup-message">
                <p>{letterContent.highlights[selectedWord].message}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
