import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import CharacterUI from "../components/CharacterUI";
import { useState, useRef, useEffect } from "react";
import Hiroba from "../components/Hiroba";
import "./Home.css";
import { db } from "../firebase";



function Home() {
  const myId =
  localStorage.getItem("myId") ||
  crypto.randomUUID();

localStorage.setItem("myId", myId);
  // 🎵 音
  const moveSoundRef = useRef(null);
  const sendSoundRef = useRef(null);
  const timeoutRef = useRef(null);

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


 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "characters"),
    (snapshot) => {
      const chars = snapshot.docs.map((doc) => {
        const msg = doc.data();

        return {
          id: doc.id,
          uid: msg.uid,
          emoji: msg.emoji,
          name: msg.name,
          x: msg.x ?? 50,
          y: msg.y ?? 50,
          messages: msg.messages || []
        };
      });

      setCharacters(chars);
    }
  );

  return () => unsubscribe();
}, []);

  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem("chars", JSON.stringify(characters));
    }
  }, [characters]);

  // 💬 送信
  const handleSend = async () => {
   console.log("送信ボタン押された");
    if (!player || !input) return;

    const text = input;
    setInput("");
   
    // 👇 Firebaseに保存！！！！
    console.log("Firebase送信直前");
 const myChar = characters.find(c => c.uid === myId);

const newMessages = [
  ...(myChar?.messages || []),
  { text, time: Date.now() }
];

const now = Date.now();
const filtered = newMessages.filter(msg => now - msg.time < 1000 * 60 * 60);

await updateDoc(doc(db, "characters", myId), {
  messages: filtered,
  time: Date.now()
});
    playSendSound(); 
    resetLogoutTimer();
  };

  // 🚪 ログアウト
  const handleLogout = async () => {
  setPlayer(null);
  
   localStorage.removeItem("myId");
  localStorage.removeItem("chars");

  await deleteDoc(doc(db, "characters", myId));
 

};
const resetLogoutTimer = () => {
  clearTimeout(timeoutRef.current);

  timeoutRef.current = setTimeout(() => {
    handleLogout();
  }, 1000 * 60 * 60); // 60分
};

  return (
    <div className="home">

      {/* タイトル */}
     <section className="hero">
  <h1>天★Que</h1>
  <p>鑑賞体験を鑑賞するアートユニット</p>
</section>

<section className="block">
  <h2>天★Que広場</h2>
</section>
      {/* 広場＋UI */}
      <div className="hiroba-wrapper">

       {/* 広場 */}
<div
  className="hiroba"
  onClick={async (e) => {
    console.log("click fired", player);
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    playMoveSound();
    resetLogoutTimer();

    if (player) {
     const myChar = characters.find(c => c.uid === myId) || {
  x: 50,
  y: 60,
  messages: []
};

await setDoc(doc(db, "characters", myId), {
  uid: myId,
  name: player.name,
  emoji: player.char,
  x,
  y,
  messages: myChar?.messages || [],
  time: Date.now()
}, { merge: true });
    }
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
         <CharacterUI
  onChange={async (newPlayer) => {
    setPlayer(newPlayer);
    resetLogoutTimer();

    await setDoc(
      doc(db, "characters", myId),
      {
        uid: myId,
        name: newPlayer.name,
        emoji: newPlayer.char,
        x: 50,
        y: 60,
        messages: [],
        time: Date.now()
      },
      { merge: true }
    );
  }}
/>

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
      <audio ref={sendSoundRef} src="/sounds/boin.mp3" />

      {/* トピック（絶対残す） */}
      <section className="block"><h2>ニュース</h2></section>
     <section
  className="block"
  onClick={() => {
    window.open("https://tenque-kansho.netlify.app", "_blank");
  }}
  style={{ cursor: "pointer" }}
>
  <h2>鑑賞記録</h2>
</section>
      <section className="block"><h2>作品</h2></section>
      <section className="block"><h2>通販ページ</h2></section>
      <section className="block"><h2>天★Que新聞</h2></section>

    </div>
  );
}

export default Home;