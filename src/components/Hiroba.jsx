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
            color: char.color,
          }}
        >
          {char.emoji}
          <div className="bubble">{char.message}</div>
        </div>
      ))}
    </div>
  );
}

export default Hiroba;