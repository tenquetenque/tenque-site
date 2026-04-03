import { useState } from "react";
import "./Hiroba.css";

function Hiroba() {
  const [position, setPosition] = useState({ x: 150, y: 150 });

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log("クリック位置", x, y); // ← デバッグ

    setPosition({ x, y });
  };

  return (
    <div
      className="hiroba-container"
      onClick={handleClick}
    >
      <div
        className="character"
        style={{
          position: "absolute",
          left: position.x + "px",
          top: position.y + "px",
          background: "red",
          zIndex: 9999,
        }}
      >
        🐡
      </div>
    </div>
  );
}

export default Hiroba;