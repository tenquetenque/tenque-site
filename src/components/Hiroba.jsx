import "./Hiroba.css"; 
function Hiroba({ characters }) {
  return (
    <div className="hiroba-container">
     {characters
  .filter((char) => char.emoji && char.name) // ←これ追加
  .map((char) => (
        <div
  key={char.id}
  className="character"
  style={{
    position: "absolute",
   left: `${char.x ?? 50}%`,
top: `${char.y ?? 50}%`

  }}
>

          {char.emoji ? (
  <img
  src={char.emoji}
  alt=""
  style={{
    width: "40px",
    height: "40px",
    objectFit: "contain"
  }}
  />
) : (
  <div style={{ width: 40, height: 40, background: "red" }} />
)}
        
          <div className="char-name">{char.name}</div>
          {char.messages && char.messages.slice().reverse().map((msg, i) => {
  const offset = 70 + i * 40;
  if (offset > 200) return null;

  return (
    <div
      key={i}
      className="bubble"
      style={{
        bottom: `${offset}px`
      }}
    >
      {msg.text}
    </div>
  );
})}

        </div>
      ))}
    </div>
  );
}

export default Hiroba;
