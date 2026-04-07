import CharacterUI from "../components/CharacterUI";
import { useState, useRef, useEffect } from "react";
import Hiroba from "../components/Hiroba";
import "./Home.css";

function Home() {
  // 🎵 音
  const moveSoundRef = useRef(null);
  const sendSoundRef = useRef(null);

  const playMoveSound = () => {
    if (moveSoundRef.current) {
      moveSoundRef.current.currentTime = 0;
      moveSoundRef.current.play();
    }
  };

  const playSendSound = () => {
    if (sendSoundRef.current) {
      sendSoundRef.current.currentTime = 0;
      sendSoundRef.current.play();
    }
  };

  // 🧠 state
  const [player, setPlayer] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");
  const [effect, setEffect] = useState(null);

  // 💾 保存
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
    if (characters.length > 0) {
      localStorage.setItem("chars", JSON.stringify(characters));
    }
  }, [characters]);

  // 💬 送信
  const handleSend = () => {
    if (!player || !input) return;

    const text = input;
    setInput("");

    setCharacters((prev) => {
      const char = prev[0] || {
        id: 1,
        emoji: player.char,
        name: player.name,
        x: 50,
        y: 60,
        messages: []
      };

      const newMessages = [
        ...char.messages,
        { text, time: Date.now() }
      ];

      const now = Date.now();
      const filtered = newMessages.filter((msg) => {
        return now - msg.time < 1000 * 60 * 60;
      });

      return [
        {
          ...char,
          emoji: player.char,
          name: player.name,
          messages: filtered
        }
      ];
    });

    playSendSound(); // ←送信音
  };

  // 🚪 ログアウト
  const handleLogout = () => {
    setPlayer(null);
    setCharacters([]);
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
    emoji: "",
    name: "",
    x: 50,
    y: 60,
    messages: []
  };

    // 👇ここがポイント！！！！！！
    if (player && player.char && player.name) {
      return [
        {
          ...char,
          emoji: player.char,
          name: player.name,
          x,
          y
        }
      ];
    }

    return prev; // ←未確定なら何も起きない
  });

  playMoveSound();
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

        {/* UI */}
        <div className="side-ui">
          <CharacterUI onChange={setPlayer} />

          {player && (
            <>
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
                <button onClick={handleSend}>send</button>
              </div>

              <button onClick={handleLogout}>
                Leaving🚪
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🎵 音 */}
      <audio ref={moveSoundRef} src="/sounds/水の底から湧き出す泡の音.mp3" />
      <audio ref={sendSoundRef} src="/sounds/ボイン.mp3" />

      {/* トピック（絶対残す） */}
      <section className="block"><h2>ニュース</h2></section>
      <section className="block"><h2>鑑賞記録</h2></section>
      <section className="block"><h2>作品</h2></section>
      <section className="block"><h2>通販ページ</h2></section>
      <section className="block"><h2>天★Que新聞</h2></section>

    </div>
  );
}

export default Home;