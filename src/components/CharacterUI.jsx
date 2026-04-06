import { useState } from "react";
import "./CharacterUI.css";

import img1 from "../assets/characters/オーラありズラ.png";
import img2 from "../assets/characters/hosi1.png";
import img3 from "../assets/characters/hosi2.png";
import img4 from "../assets/characters/hosi3.png";
import img5 from "../assets/characters/hosi4.png";
import img6 from "../assets/characters/hosi5.png";
import img7 from "../assets/characters/hosi6.png";
import img8 from "../assets/characters/hosi7.png";
import img9 from "../assets/characters/hosi8.png";
import img10 from "../assets/characters/hosi9.png";
import img11 from "../assets/characters/hosi10.png";
import img12 from "../assets/characters/hosi11.png";
import img13 from "../assets/characters/hosi12.png";
import img14 from "../assets/characters/hosi13.png";

export default function CharacterUI({ onChange }) {

  const characters = [
    img1,img2,img3,img4,img5,img6,img7,
    img8,img9,img10,img11,img12,img13,img14
  ];

  const [char, setChar] = useState(characters[0]);
  const [name, setName] = useState("");
  const [talk, setTalk] = useState("");

  function apply(){
    onChange({
      name,
      char,
      message: talk
    });
    setTalk("");
  }

  return (
    <div className="char-ui">

      {/* 👇 iconボックス */}
      <div className="icon-box">
        {characters.map((c,i)=>(
          <img
            key={i}
            src={c}
            className={`icon ${char === c ? "active" : ""}`}
            onClick={()=>setChar(c)}
          />
        ))}
      </div>

      {/* 👇 name */}
      <div className="input-group">
        <label>name</label>
        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>

      {/* 👇 talk */}
      <div className="input-group">
        <label>talk</label>
        <input
          value={talk}
          onChange={(e)=>setTalk(e.target.value)}
        />
      </div>

      <button onClick={apply}>送信</button>

    </div>
  );
}