import CharacterUI from "../components/CharacterUI";
import { useState, useRef } from "react";
import Hiroba from "../components/Hiroba";
import "./Home.css";

function Home() {
  const [player, setPlayer] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");

  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSend = () => {
    if (!input || !player) return;

    const newChar = {
      id: Date.now(),
      emoji: player.char,
      color: player.color,
      name: player.name,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      message: input,
    };

    setCharacters([...characters, newChar]);
    setInput("");
    playSound();
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
        <div className="hiroba">
          <Hiroba characters={characters} />
        </div>

        {/* UI（右側） */}
        <div className="side-ui">

          {/* キャラ選択 */}
          <CharacterUI onChange={setPlayer} />

          {/* 決定後にだけ入力欄が出る */}
          {player && (
            <div className="chat-box">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="コメント..."
              />
              <button onClick={handleSend}>送信</button>
            </div>
          )}

        </div>

      </div>

      {/* 音 */}
      <audio ref={audioRef} src="/sounds/coin.mp3" />

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