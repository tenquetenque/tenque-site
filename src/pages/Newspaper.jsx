import "./Newspaper.css";

const newspapers = [
  {
    id: 1,
    title: "天★Que新聞 創刊号",
    image: "/images/tenkyupaper1.jpeg",
    date: "2026年3月16日",
    sevenEleven: "21591244",
    lawson: "97UGQXPKBM",
    printSetting: "長辺とじ・両面印刷",
    deadline: "2026年8月26日",
  },
   {
    id: 2,
    title: "天★Que新聞 02",
    image: "/images/tenkyupaper2.jpeg",
    date: "2026年6月18日",
    sevenEleven: "86077473",
    lawson: "97UGQXPKBM",
    printSetting: "長辺とじ・両面印刷",
    deadline: "2026年8月26日",
  },


];

function Newspaper() {
  return (
    <div className="newspaper-page">

      <div className="newspaper-header">
        <img
  src="/images/tenkyusinnbunrogo.png"
  alt="天★Que新聞"
  className="newspaper-logo"
/>
<img
  src="/images/sinbuninfo.PNG"
  alt="天★Que新聞について"
  className="newspaper-info-image"
/>



       <p className="newspaper-description">
          天★Que新聞とはなんぞやっ？！
ぉお堅い文体の展覧会レビューも大切ですが、そればかりだと肩まで凝ってしまうもんね…！そんなあなたに！ハードルマイナス60兆で、展覧会の鑑賞について考えたり参加できる新聞がたったいまできたらしいんです！それは、あなたが今手に持っている天★Que新聞んぶんぶんぶ〜（エコー）
記事の内容は、天★Queの2人が展覧会でペチャクチャしゃべったおはなしを速記した「鑑賞記録」や日常で起こったことをもとに、つくっていきます！
鑑賞記録写真。
（まがまがしいほどの量の記録。これでなんと展覧会一回分なんです。こんなのが何束もあるんです！！）
鑑賞記録はそれ自体が天★Queの大事な作品なので、天★QueのHPにある「倉庫」に保管しておくことにしてと、さてと！これをもっと「ギュッ」と1000倍濃縮したものが、新聞の記事になっております！
いつでもだれでも、鑑賞についてフィードバックできる！そんな気軽過ぎる場にしたいんです！この天★Que新聞を！
さあ！鑑賞ロケット発射！


        </p>
      </div>

      <div className="newspaper-grid">

        {newspapers.map((newspaper) => (
          <div
            key={newspaper.id}
            className="newspaper-item"
            onClick={() => {
              window.location.href = `/newspaper/${newspaper.id}`;
            }}
          >
            <img
              src={newspaper.image}
              alt={newspaper.title}
              className="newspaper-thumbnail"
            />

            <p className="newspaper-title">
              {newspaper.title}
            </p>

            <p className="newspaper-date">
              {newspaper.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Newspaper;


