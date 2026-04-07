import CharacterUI from "../components/CharacterUI";
import { useState, useRef, useEffect } from "react";
import Hiroba from "../components/Hiroba";
import "./Home.css";

function Home() {
  const [player, setPlayer] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
  const saved = localStorage.getItem("chars");
  if (saved && saved !== "undefined") {
    try {
      setCharacters(JSON.parse(saved));
    } catch (e) {
      console.log("parse error");
    }
  }
}, []);
useEffect(() => {
  if (characters.length > 0) {   // ←これ追加
    localStorage.setItem("chars", JSON.stringify(characters));
  }
}, [characters]);
  const [effect, setEffect] = useState(null);

  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

 const handleSend = () => {
  if (!player || !input) return;

  const text = input;   // ←先に保存
  setInput("");         // ←先に消す

  setCharacters((prev) => {
    const char = prev[0] || {
      id: 1,
      emoji: player.char,
      name: player.name,
      x: 50,
      y: 60,
      messages: []
    };

    const newMessages = [...char.messages, text];

    if (newMessages.length > 5) {
      newMessages.shift();
    }

    return [
      {
        ...char,
        emoji: player.char,
        name: player.name,
        messages: newMessages
      }
    ];
  });

  playSound();
};
const handleLogout = () => {
  setPlayer(null);
};
  return (
    <div className="home">

      {/* タイトル */}
      <section className="hero">
        <h2>天★Que広場</h2>
      </section>

      {/* 広場＋UI */}
      <div className="hiroba-wrapper">

        {/* 広場 */}
        <div
  className="hiroba"
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

   setCharacters((prev) => {
  const char = prev[0] || {
    id: 1,
    emoji: player?.char || "",
    name: player?.name || "",
    x: 50,
    y: 60,
    messages: []
  };

  return [
    {
      ...char,
      emoji: player?.char || char.emoji,
      name: player?.name || char.name,
      x,
      y
    }
  ];
});
    playSound();
  }}
>
   {effect && (
    <div
      className="sparkle"
      style={{
        left: `${effect.x}%`,
        top: `${effect.y}%`
      }}
    />
  )}

  <Hiroba characters={characters} />
</div>

        {/* UI（右側） */}
        <div className="side-ui">

          {/* キャラ選択 */}
          <CharacterUI onChange={setPlayer} />

{player && (
  <button onClick={handleLogout}>
    🚪
  </button>
)}
          

          {/* 決定後にだけ入力欄が出る */}
          {player && (
            <div className="chat-box">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="comment"
              onKeyUp={(e) => {
  if (e.key === "Enter") {
    handleSend();
  }
}}
              />
              <button onClick={handleSend}>送信</button>
            </div>
          )}
        </div>

      </div>

      {/* 音 */}
      <audio ref={audioRef} src="/sounds/水の底から湧き出す泡の音.mp3" />

      {/* トピック（絶対残す） */}
      <section className="block">
        <h2>ニュース</h2>
      </section>

      <section className="block">
        <h2>鑑賞記録</h2>
      </section>

      <section className="block">
        <h2>作品</h2>
      </section>

      <section className="block">
        <h2>通販ページ</h2>
      </section>

      <section className="block">
        <h2>天★Que新聞</h2>
      </section>

    </div>
  );
}

export default Home;