import { useState } from "react";
import "./CharacterUI.css";

export default function CharacterUI({ onChange }) {
    const characters = [
    "/src/assets/characters/オーラありズラ.png",
    "/src/assets/characters/frog.png",
    "/src/assets/characters/cat.png",
  ];
  const [char, setChar] = useState(characters[0]);
  const colors = ["#f8c8dc","#c8e6ff","#d4f8c8","#fff3b0","#e0c8ff"];

  const [color, setColor] = useState(colors[0]);
  const [name, setName] = useState("sumaso2");

  function randomize(){
    setColor(colors[Math.floor(Math.random()*colors.length)]);
  }

  function apply(){
    onChange({
      name,
      color,
      char: "૮ ˙Ⱉ˙ ა"
    });
  }

  return (
    <div className="char-ui">

      <h2>キャラ選択</h2>

      <div className="main-box">
        
        {/* 👇ここ名前変更（超重要） */}
        <div className="ui-character">
          <div className="avatar" style={{ color }}>
            ૮ ˙Ⱉ˙ ა
          </div>
          <p>{name}</p>
        </div>

        <div className="palette">
          {colors.map((c,i)=>(
            <div 
              key={i} 
              className="color"
              style={{ background: c }}
              onClick={()=>setColor(c)}
            />
          ))}
        </div>

      </div>

      {/* スライダー（そのままでもOK） */}
      <input type="range" />

      {/* 名前 */}
      <div className="name">
        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <span>タイプ</span>
        <div 
          className="color-preview"
          style={{ background: color }}
        />
      </div>

      {/* 決定ボタン */}
      <button onClick={apply}>
        このキャラで決定
      </button>

      {/* ランダム */}
      <button onClick={randomize}>
        キャラランダム変更
      </button>

    </div>
  );
}