import Hiroba from "../components/Hiroba";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* タイトルだけ */}
      <section className="hero">
        <h2>天★Que広場</h2>
      </section>

      {/* 👇広場は外に出す */}
      <div className="hiroba">
        <Hiroba />
      </div>

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