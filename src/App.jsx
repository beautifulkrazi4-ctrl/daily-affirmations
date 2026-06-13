import { useState, useEffect, useCallback } from "react";

const CATEGORIES = ["confidence", "abundance", "beauty", "power", "love", "creativity"];

const STATIC_AFFIRMATIONS = {
  confidence: [
    "I walk into every room knowing my presence is magnetic and undeniable.",
    "My confidence is not borrowed — it was born in me and it grows every day.",
    "I trust myself completely. My instincts are sharp, my vision is clear.",
  ],
  abundance: [
    "Money flows to me easily because I create real value in everything I touch.",
    "I am worthy of luxury, rest, and everything I desire — without guilt.",
    "Opportunities find me because I show up fully and unapologetically.",
  ],
  beauty: [
    "My body is a work of art — unique, intentional, and endlessly captivating.",
    "I adorn myself with care because I am worth the ritual.",
    "Beauty radiates from me — it lives in how I move, speak, and love myself.",
  ],
  power: [
    "No one controls my narrative. I write my own story, in ink that doesn't fade.",
    "I am not waiting to be chosen — I choose myself, daily and deliberately.",
    "My softness is not weakness. I am both flower and thorn.",
  ],
  love: [
    "I give and receive love freely, without shrinking or over-explaining.",
    "I am someone who is deeply loved, cherished, and held — including by myself.",
    "My heart is open and protected at the same time. I know the difference.",
  ],
  creativity: [
    "Everything I create carries a piece of my soul — and the world is lucky to receive it.",
    "My ideas are original, timely, and worth sharing. I don't hold back.",
    "I am an artist of my own life — the palette, the canvas, and the brush.",
  ],
};function FloralSVG({ color = "#C9B8F0", opacity = 0.18 }) {
  return (
    <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <g opacity={opacity} stroke={color} strokeWidth="1" fill="none">
        <path d="M 30 30 Q 60 10 80 40 Q 50 60 30 30Z" />
        <circle cx="55" cy="25" r="6" />
        <path d="M 20 50 Q 40 30 60 55" />
        <path d="M 10 70 Q 35 50 55 75" />
        <circle cx="35" cy="65" r="4" />
        <path d="M 70 15 L 70 50 M 60 30 Q 70 25 80 30" />
        <path d="M 370 30 Q 340 10 320 40 Q 350 60 370 30Z" />
        <circle cx="345" cy="25" r="6" />
        <path d="M 380 50 Q 360 30 340 55" />
        <path d="M 390 70 Q 365 50 345 75" />
        <circle cx="365" cy="65" r="4" />
        <path d="M 330 15 L 330 50 M 340 30 Q 330 25 320 30" />
        <path d="M 30 370 Q 60 390 80 360 Q 50 340 30 370Z" />
        <circle cx="55" cy="375" r="6" />
        <path d="M 20 350 Q 40 370 60 345" />
        <path d="M 10 330 Q 35 350 55 325" />
        <path d="M 370 370 Q 340 390 320 360 Q 350 340 370 370Z" />
        <circle cx="345" cy="375" r="6" />
        <path d="M 380 350 Q 360 370 340 345" />
        <path d="M 390 330 Q 365 350 345 325" />
        <path d="M 195 18 Q 175 8 178 22 Q 185 28 195 22Z" />
        <path d="M 205 18 Q 225 8 222 22 Q 215 28 205 22Z" />
        <circle cx="200" cy="22" r="2.5" fill={color} />
        <path d="M 8 140 Q 20 160 8 180 Q 20 200 8 220" strokeDasharray="3 4" />
        <path d="M 392 140 Q 380 160 392 180 Q 380 200 392 220" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1 L8.8 6.2 L14 7 L8.8 7.8 L8 13 L7.2 7.8 L2 7 L7.2 6.2 Z" fill="#D4A84B" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "#F2A7C3" : "none"} stroke="#F2A7C3" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}export default function DailyAffirmations() {
  const [category, setCategory] = useState("confidence");
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showFavs, setShowFavs] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [streak, setStreak] = useState(7);
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    pickAffirmation("confidence");
  }, []);

  useEffect(() => {
    setIsFav(favorites.includes(affirmation));
  }, [affirmation, favorites]);

  const pickAffirmation = useCallback(async (cat) => {
    setVisible(false);
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));

    if (useAI) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 1000,
            messages: [{
              role: "user",
              content: `Write one powerful, beautiful daily affirmation for the theme: "${cat}". 
              It should be poetic, bold, and empowering — written for a confident woman who is a content creator and values beauty, self-expression, and authenticity. 
              Keep it to 1-2 sentences max. Return ONLY the affirmation text, no quotes, no explanation.`
            }]
          })
        });
        const data = await res.json();
        const text = data.content?.map(b => b.text || "").join("").trim();
        if (text) {
          setAffirmation(text);
          setLoading(false);
          setVisible(true);
          return;
        }
      } catch (e) {}
    }

    const pool = STATIC_AFFIRMATIONS[cat];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setAffirmation(pick);
    setLoading(false);
    setVisible(true);
  }, [useAI]);

  const handleCategory = (cat) => {
    setCategory(cat);
    pickAffirmation(cat);
  };

  const toggleFav = () => {
    if (!affirmation) return;
    setFavorites(prev =>
      prev.includes(affirmation) ? prev.filter(f => f !== affirmation) : [...prev, affirmation]
    );
  };

  const categoryEmoji = { confidence: "✦", abundance: "◈", beauty: "❋", power: "◉", love: "♡", creativity: "✿" };
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1A0A2E 0%, #2D1454 50%, #1A0A2E 100%)",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 16px 48px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "fixed", top: "-80px", left: "-80px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,184,240,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(242,167,195,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: "520px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <p style={{ color: "#C9B8F0", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", margin: 0 }}>{greeting}, Mindy</p>
          <h1 style={{ color: "#FAF3E8", fontSize: "22px", margin: "4px 0 0", fontWeight: "normal", letterSpacing: "1px" }}>Daily Affirmations</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#D4A84B", fontSize: "18px", fontWeight: "bold" }}>{streak}</div>
            <div style={{ color: "#C9B8F0", fontSize: "10px", letterSpacing: "1px" }}>day streak</div>
          </div>
          <button onClick={() => setShowFavs(!showFavs)} style={{ background: showFavs ? "rgba(242,167,195,0.2)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(242,167,195,0.3)", borderRadius: "20px", color: "#F2A7C3", padding: "6px 14px", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
            {showFavs ? "← back" : `♡ ${favorites.length}`}
          </button>
        </div>
      </div>
      {showFavs ? (
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <p style={{ color: "#C9B8F0", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>Saved affirmations</p>
          {favorites.length === 0 ? (
            <p style={{ color: "rgba(250,243,232,0.4)", fontStyle: "italic", textAlign: "center", marginTop: "60px" }}>Your saved affirmations will appear here.</p>
          ) : favorites.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,184,240,0.15)", borderRadius: "16px", padding: "20px", marginBottom: "12px", color: "#FAF3E8", fontSize: "16px", lineHeight: "1.7" }}>
              <span style={{ color: "#D4A84B", marginRight: "10px" }}>✦</span>{f}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "28px", maxWidth: "520px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => handleCategory(cat)} style={{ background: category === cat ? "linear-gradient(135deg, rgba(201,184,240,0.25), rgba(242,167,195,0.2))" : "rgba(255,255,255,0.04)", border: category === cat ? "1px solid rgba(201,184,240,0.6)" : "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: category === cat ? "#FAF3E8" : "rgba(250,243,232,0.5)", padding: "7px 16px", fontSize: "12px", cursor: "pointer", letterSpacing: "1.5px", textTransform: "uppercase", transition: "all 0.2s" }}>
                {categoryEmoji[cat]} {cat}
              </button>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: "520px", background: "linear-gradient(145deg, rgba(45,20,84,0.8), rgba(26,10,46,0.9))", border: "1px solid rgba(201,184,240,0.2)", borderRadius: "28px", padding: "48px 36px", position: "relative", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,184,240,0.1)", minHeight: "280px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "opacity 0.4s ease", opacity: visible ? 1 : 0 }}>
            <FloralSVG />
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C9B8F0", opacity: 0.6, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
                <p style={{ color: "rgba(201,184,240,0.5)", fontSize: "12px", letterSpacing: "2px" }}>channeling your affirmation...</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "20px", opacity: 0.6 }}><SparkleIcon /></div>
                <p style={{ color: "#FAF3E8", fontSize: "clamp(17px, 3.5vw, 22px)", lineHeight: "1.75", textAlign: "center", fontStyle: "italic", fontWeight: "normal", margin: 0, position: "relative", zIndex: 1 }}>{affirmation}</p>
                <div style={{ marginTop: "20px", opacity: 0.6 }}><SparkleIcon /></div>
              </>
            )}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px", alignItems: "center" }}>
            <button onClick={toggleFav} style={{ background: isFav ? "rgba(242,167,195,0.15)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(242,167,195,0.3)", borderRadius: "50px", padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#F2A7C3", fontSize: "13px", letterSpacing: "1px", transition: "all 0.2s" }}>
              <HeartIcon filled={isFav} /> {isFav ? "saved" : "save"}
            </button>
            <button onClick={() => pickAffirmation(category)} style={{ background: "linear-gradient(135deg, rgba(201,184,240,0.2), rgba(242,167,195,0.15))", border: "1px solid rgba(201,184,240,0.4)", borderRadius: "50px", padding: "12px 28px", cursor: "pointer", color: "#FAF3E8", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.2s" }}>
              ✦ new affirmation
            </button>
            <button onClick={() => setUseAI(!useAI)} style={{ background: useAI ? "rgba(212,168,75,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${useAI ? "rgba(212,168,75,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: "50px", padding: "12px 16px", cursor: "pointer", color: useAI ? "#D4A84B" : "rgba(250,243,232,0.3)", fontSize: "11px", letterSpacing: "1px", transition: "all 0.2s" }}>
              {useAI ? "✦ AI on" : "AI off"}
            </button>
          </div>
          <div style={{ marginTop: "40px", maxWidth: "520px", width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,184,240,0.1)", borderRadius: "20px", padding: "20px 28px", textAlign: "center" }}>
            <p style={{ color: "rgba(201,184,240,0.6)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 8px" }}>daily ritual</p>
            <p style={{ color: "rgba(250,243,232,0.7)", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Read your affirmation aloud three times. Place your hand on your heart. Let it in.</p>
          </div>
        </>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        button:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
                }
