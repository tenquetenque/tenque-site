function Hiroba({ characters }) {
  return (
    <div className="hiroba-container">
      {characters.map((char) => (
        <div
          key={char.id}
          className="character"
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
          }}
        >
          {/* 👇画像に変更 */}
          <img
            src={char.emoji}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain"
            }}
          />

          <div className="bubble">{char.message}</div>
        </div>
      ))}
    </div>
  );
}

export default Hiroba;
import "./Hiroba.css"; // ←これある？