import { useMemo, useState } from "react";

const COLORS = {
  blue: "#3A00FF",
  blue2: "#5A2BFF",
  yellow: "#C8D24A",
  yellow2: "#E4EA73",
  red: "#E60012",
  black: "#111111",
  white: "#FFFFFF",
  gray: "#F6F6F6",
  border: "#1D1D1D",
};

const siteInfo = {
  name: "天★Que",
  catch: "今日が鑑賞ハピネスデイ。",
  description:
    "隕石のように登場、天★Queと申します！天★Queは村井祐希とシエニーチュアンからなる鑑賞ユニットから始まった、あなたの鑑賞を手伝うグッズを制作・販売する不思議な通販会社です。この２人の修行方法が変わってる！不思議グッズの源である鑑賞エネルギーを集めるために日々些細なことも文字起こし、なんでも記録！報告！作品やみんなと話したことをみえる化しちゃう、鑑賞体験を鑑賞できるかたちに。硬軟とりまぜたトキメキの世界だ！",
  logoPath: "/logo.png", // public/logo.png を置けば表示される
};

const products = [
  {
    id: 1,
    name: "た★スケール",
    price: "¥4,980（税込）",
    description:
      "あなたの鑑賞をそっと手伝う、不思議な天★Queグッズ。正式公開までしばらくお待ちください。",
    image: "/IMG_2037.JPG",
    badge: "NEW",
  },
  {
    id: 2,
    name: "鑑賞エネルギー補助用品（準備中）",
    price: "¥2,200（税込）",
    description:
      "記録・報告・観察をもっとたのしくするための、天★Que式・補助アイテム。",
    image: "/product-placeholder.jpg",
    badge: "注目",
  },
];

const newsItems = [
  {
    id: 1,
    title: "天★Queニュース 第1号（準備中）",
    date: "2026.01.21",
    excerpt:
      "新商品、鑑賞活動、観測報告などをお知らせする天★Queニュース。ここに追加していけます。",
  },
  {
    id: 2,
    title: "天★Que通販、準備中！",
    date: "2026.01.20",
    excerpt:
      "あなたの鑑賞を手伝うグッズの公開に向けて、サイトを整備中です。",
  },
];

const archiveItems = [
  {
    id: 1,
    title: "天★Que新聞アーカイブ 第1号（準備中）",
    date: "2026.01.01",
    summary: "過去の天★Que新聞をここに蓄積していけます。",
  },
];

const works = [
  {
    id: 1,
    title: "成果物アーカイブ（準備中）",
    date: "2026.01.21",
    summary:
      "展示、グッズ、テキスト、映像、イベントなど、天★Queの成果物をここに蓄積していきます。",
  },
];

const records = [
  {
    id: "hori-2025-08-28",
    title: "堀浩哉　鑑賞記録　2025.8.28",
    date: "2025.08.28",
    tags: ["鑑賞記録", "展示", "堀浩哉"],
    heroImage: "",

    // ↓ ここをあとでPDF全文そのままに差し替えられる
    blocks: [
      {
        type: "text",
        content: `堀浩哉　鑑賞記録　2025.8.28



`,
      
        type: "image",
        src: "IMG_7071.HEIC",
        alt: "展示風景2",
        caption: "複数画像もOK",
      },
      ,

      // し込みブロック例
     

      {
        type: "text",
        content: `展示をみる前のシエニーさんのイメージ　美共闘　
李禹煥の簡易的なバージョン

シエ
なんでキャンバスに紙をペタペタ貼ってから絵を描いてるんだろう。
（大きくちぎった和紙が隙間なくキャンバスを覆う、キャンバスに直接描いているものはない。しかし小作品はキャンバスはなく紙に描かれている）
お札みたいに何かを押さえ込んでるような行為と筆触の儀式的な感じ、お祓いとかの榊を振ってるような筆運びをはじめに感じた
村井
展示されてる絵に共通の印象として、海辺や川のイメージがある。
三途の川を渡る最中に、霧がかかっていたり。それで、オイルパステルの黒い線は、絵の一番手前（こちら側）にかかる草のよう。
その草越しから、奥の川や海を見ているかんじ。その川や海の水平線は見えず、手前の水面を見下ろしてズームアップしたような視界が特徴的。
シエニー
（わかったぞ！！！ってかんじ！）
私は、絵（キャンバス）を包んでいるように思った。どうしてもキャンバスに貼り付けてる紙のテクスチャーが目立つ。 
キャンバスなのに和紙のようなものがキャンバス目を隠すように貼られているのが一番に気になった。
これが絵ってバレないように、絵を描いてる。
これの中がほんとの絵で、お札を貼って封印してるような…
黒い線（オイルパステル）も、何かを描いているようには見えない。これは絵です、て見せるためのカモフラージュ。
キャンバスを縛ってるかんじ。
絵具がのってて、線がある、＝絵と思わせてる。
おとりの絵をのせている。
とにかく気になったのは、キャンバスに紙を貼って覆ってるところ。
60年代、絵を描いてるのがダメ、ということがまだ残っているっぽい。
アンデパンダン展でも、絵を出すのはダサかった。その時に活動していた作家の今をチェックしてみたことがあるけど、老人になっても活動していて、でも普通には絵を描いてなかった。仏像画？を描いていた。（桜井孝身）
そういう、素直じゃない、改造された人の絵って感じがする。だから、ステートメントで、絵を請け負っていい、と書いてある。
村井
堀さんのパフォーマンスに昔何度か参加したことがあって、そのうち、色んな人が書いた文章がポスターみたくずらりと壁に貼ってある部屋で、真ん中に大きな絵の木枠、があって、レボリューション！と言いながら木枠に布をかけていく、というのだった。キャンバスの木枠と、そこにかける布という関係性は、堀さんが昔からよく扱うことだと思う。
初期の、木枠に布が外されている作品とかもだけど。今回のシエニーさんの言う、絵を隠している、というのも、木枠の上に布や紙で覆うということに着目してるよね。
シエニー
うん。覆ってる。本物の絵を隠してる。
絵狩り、みたいなのあったんじゃない？こいつ、描いてんぞ！口聞かねえー。みたいな。
村井
じゃあ、裏の部屋にあるドローイングは？
本当の絵がない？
梱包だけあるかんじ？
シエニー
堀さんの絵は、紙に描いて、あとでそれをキャンバスに貼ってるよね。だから、ドローイングみたく、紙だけの状態も制作中ある…？
村井
じゃあ、ダミーの絵を先に描いてるってこと？笑
包んでる、封印してるかんじは、キャンバスの上に紙が貼られているというだけじゃなく、画面の黒い線の包んでるような軌道にも表れてるかもね。
でも、包んでるけど、閉じてない気がする。
なんで閉じたない、と感じるのか…。
シエニー
この線は、紙の状態で、まず下に敷いて描いてるのかな。
シエニー
遠くからみると、さささって描いたような引っ掻き傷のような線だけど、身体をもって近くからみると、そんな細くなくて、手を伸ばした距離や描いた苦労を感じる。
こう描いては、一回止まって、また描いて、みたいな、近くで線をみるとそういう労働の痕跡を感じる。
死体遺棄みたいな。掘った穴（和紙の下）に死体（絵）のかかと、カーディガンのすそ、はみ出ないように穴に入れる。物じゃなく、オーラみたいなのを閉じこめてるなら、この形（黒い線の軌道）になってもいいかも。線でオーラをホールドする感じ。
※シエニーのホールド実践動画あり
村井
（線は）いかつい感じね。
よくみると、途切れてたりね。
シエニー
時には寝っ転がって、自分の手の長さがちょうど反映してる。

村井
おれは堀さんの絵、やっぱり閉じてるとは思わない。真ん中から、波動のように外へ広がっていくような形がみえる。
あと、堀さんの絵は全て、やっぱり海がみえて、絵に描かれた海に対しての鑑賞者の位置が強く意識されると思う。
真ん中が膨れた唇みたいになってる。その周りをかなり、、、開いてもないかも。開いてるとしたら波打ってる線が釣り針状になってなくてフニャンと柔らかいと思う。鑑賞者の位置が開かれてる場所にある？
絵の中に入った時に野原みたいな空間。
鑑賞者の位置を実感しちゃう絵。絵と展示場所の間に黒い線があるような感じ。黒い線はニラみたいな感じで柔らかく鑑賞体験は開かれている。



鑑賞者と海の間にちょうど黒い線がある。
鑑賞者は、黒い線をまたがないと、その奥に描かれた海へ行けない。黒い線越しに、のぞくような海をみる。でも、のぞくというよりは、開けている。黒い線も隙間がたくさんある。
そして、視点は局所的で、海の地平線はみえずに、足元の水面をみている。

村井
この絵は、銀色（白）のまだらなタッチが、霧のようで、草をかき分けながら霧の中の川を歩いてるような。
シエニー
黒い線はどこにあるの？
村井黒い線はちょうど、展示場と絵の境界。

シエ
じゃあこの太い赤は？太い線を見ると黒い線より手前にある。黒い線を絵と鑑賞者の境界線だとするとさ、この赤はこちら側に絵が飛び出している感じ？

村井
でもその太い筆触を見ると境界線もただの絵になっちゃう。もうちょっとみないとわからんな。（銀色に黒、赤の絵）
このとき村井赤い線、飛び出してきてるわけじゃないかもとのこと

シエニー
シエ、向こうにもこの世界があるんじゃない？
キャンバスに赤い絵の具がのってて、その上に黒い線が引いてあって、一番手前に銀色がある世界。
【こっちのせかい】
シエ村井（鑑賞者）→赤→境界線の黒い茂み→銀色の海
【あっちの世界】
赤色の海←境界線の黒い茂み←銀←偽シエ偽村井（偽鑑賞者）

絵のあっち側にも人がいて、私たちと同じようなことを言ってる。あっちにも話してる人がいて、白が邪魔で奥がみえないな〜とか。笑
村井
赤は、物理的で、独立して動きそう。黒い線の手前にあって、、光の盲点？
もっと弱いかんじ。目にみえるなかで、見えないところ？潰れてるところ。
日光とかをみたあとに残るやつ。
それが、線と透過してる。
赤はこんなに強烈な赤なのに、画面上では弱い。他の要素、黒い線などは身体に働きかける。そこに没入してるかんじ。でも、赤は、目に働きかける。絵を見る時の盲点。

村井
川岸（絵の絵手前）だと、赤の盲点は手前にあって、川（絵の銀の線）に入り込むと、黒の奥にあるようになる。
シエ
赤は目に張り付いているかんじ？？



シエニー
（手前の絵の具は目に直接物質的に働$きかけていると仮定するとしたら）
この絵は、目に水が入ったみたいじゃない？
村井
そういう痛さがあるね。
シエニーさんは、これらの絵を梱包されてる、閉じこめられてる絵とみるんだよね。最小限の絵っぽさとして、手前に太い線を描いてると。たしかに、近づくと、労働感、閉じこめてる感はあるね。

これは、おれはアーチ状の草が連続してて、それを俯瞰してみてるみたい。

シエニー
私はこれはめちゃくちゃ封印して、奥のたくさんの黒い線が、少し隙間からみえてる。
ところで、ぱっと見、一番インパクトのある絵、強い絵ってどれだと思う？
私はこれ。
村井
おれは、これかな

漫画のオノマトペみたいな赤い線で文字みたいにも一瞬みえるけど、赤がすごく強く見える。
奥の部屋の小さい絵は、水平の線（海）がないから、入っていけない。

帰る前にコレクターごっこした

シエニさんが購入したのはこれ
村井的には、キャンバスのあつみがあるほうが物としていいと思ったが、シエニーは紙の方がパフォーマンス的で60年台の仕事の雰囲気を感じられるからこれがいいらしい。
シエ
カビのようなものが見えるのもいい。何か滲み出てくるものを押さえ込んでる感じがする。今日思ったことをインスタントみたいに復元できそう

これもはじめ悩んでた

おれはこの絵かな。
でも場所があったら

この絵が本当はいいかな。
堀さんぽさ、力強さがやっぱあった方がいい。

村井
こうやってコレクターって絵を選んでるのかな
シエ
たのしいね

今回は、お互いの視点を共有し合い、質問や指摘をしながら引き出し合いながら、最終的にはそれぞれ独自の見方を深めていくような鑑賞体験だった。

通常、二人で同じ作品を見るときは、話し合いながら共通の理解や解釈を築いていくことが多いが、今回はそうではなく、個人の鑑賞をより豊かに育てる方向に向かった。

また、コレクターのようにどの絵を所有したいかという同じ観点で作品を見たときもそれぞれの違いがあっておもしろかった。

シエはこの鑑賞体験を思い出させてくれるような作品または自分の理解やシナリオに紐付けた作品を、

村井は作家らしさ、その作品を見れば即座にその作家や制作行為を思い起こすような、特徴的でキャラクター性の際立った作品を、それぞれ今回空想購入した。
自分たちのライトに別のモードをつけた例
`,
      },

      {
        type: "image",
        src: "IMG_7068.MOV",
        alt: "展示風景2",
        caption: "複数画像もOK",
      },

      {
        type: "text",
        content: `さらに本文の続き。`,
      },
    ],
  },
];

function Header({ currentPage, setCurrentPage }) {
  const menu = [
    { key: "home", label: "TOP" },
    { key: "news", label: "天★Queニュース" },
    { key: "shop", label: "通販ページ" },
    { key: "works", label: "成果物" },
    { key: "warehouse", label: "倉庫" },
    { key: "about", label: "ABOUT" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: COLORS.blue,
        borderBottom: `4px solid ${COLORS.red}`,
        boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: COLORS.white,
            fontWeight: 900,
            fontSize: 24,
          }}
        >
          <img
            src={siteInfo.logoPath}
            alt="天★Que ロゴ"
            style={{
              width: 48,
              height: 48,
              objectFit: "contain",
              borderRadius: 12,
              background: COLORS.yellow,
              padding: 4,
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span>{siteInfo.name}</span>
        </button>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {menu.map((item) => {
            const active = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                style={{
                  background: active ? COLORS.yellow : COLORS.white,
                  color: active ? COLORS.black : COLORS.blue,
                  border: `2px solid ${COLORS.black}`,
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function Hero({ setCurrentPage }) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${COLORS.yellow} 0%, ${COLORS.yellow2} 45%, ${COLORS.white} 100%)`,
        borderBottom: `6px solid ${COLORS.blue}`,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "28px 16px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 20,
          }}
        >
          <div
            style={{
              background: COLORS.white,
              border: `4px solid ${COLORS.black}`,
              borderRadius: 24,
              padding: 24,
              boxShadow: "8px 8px 0 rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: COLORS.red,
                color: COLORS.white,
                fontWeight: 900,
                padding: "6px 12px",
                borderRadius: 999,
                marginBottom: 12,
              }}
            >
              公式通販サイト風
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 42,
                lineHeight: 1.1,
                color: COLORS.blue,
                fontWeight: 900,
              }}
            >
              {siteInfo.catch}
            </h1>

            <p
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: 800,
                color: COLORS.black,
              }}
            >
              隕石のように登場、天★Queと申します！
            </p>

            <p
              style={{
                marginTop: 16,
                lineHeight: 1.9,
                fontSize: 16,
                color: COLORS.black,
                whiteSpace: "pre-wrap",
              }}
            >
              {siteInfo.description}
            </p>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setCurrentPage("shop")}
                style={ctaPrimary}
              >
                通販ページを見る
              </button>
              <button
                onClick={() => setCurrentPage("warehouse")}
                style={ctaSecondary}
              >
                倉庫へ行く
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            <div style={promoCardStyle}>
              <div style={promoBadge}>大注目</div>
              <div style={promoTitle}>鑑賞記録、続々公開！</div>
              <div style={promoText}>
                倉庫内「鑑賞記録」から、展示の記録・会話・感想をチェック。
              </div>
              <button onClick={() => setCurrentPage("warehouse")} style={smallBtn}>
                今すぐ見る
              </button>
            </div>

            <div style={promoCardStyle}>
              <div style={{ ...promoBadge, background: COLORS.blue }}>準備中</div>
              <div style={promoTitle}>不思議グッズ通販</div>
              <div style={promoText}>
                あなたの鑑賞を手伝う、天★Queのグッズを今後追加予定。
              </div>
              <button onClick={() => setCurrentPage("shop")} style={smallBtn}>
                通販ページへ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home({ setCurrentPage }) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />

      <Section title="最新鑑賞記録">
        <div style={grid3}>
          {records.slice(0, 3).map((record) => (
            <Card key={record.id}>
              <Tag>{record.date}</Tag>
              <h3 style={cardTitle}>{record.title}</h3>
              <p style={cardText}>
                倉庫内の鑑賞記録ページにて、ブロック式で画像差し込みしながら掲載できます。
              </p>
              <button onClick={() => setCurrentPage(`record:${record.id}`)} style={smallBtn}>
                読む
              </button>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="天★Queニュース">
        <div style={grid2}>
          {newsItems.map((item) => (
            <Card key={item.id}>
              <Tag red>{item.date}</Tag>
              <h3 style={cardTitle}>{item.title}</h3>
              <p style={cardText}>{item.excerpt}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="おすすめ通販コーナー">
        <div style={grid2}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}

function NewsPage() {
  return (
    <Section title="天★Queニュース">
      <div style={{ display: "grid", gap: 16 }}>
        {newsItems.map((item) => (
          <Card key={item.id}>
            <Tag red>{item.date}</Tag>
            <h2 style={cardTitle}>{item.title}</h2>
            <p style={cardText}>{item.excerpt}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ShopPage() {
  return (
    <Section title="通販ページ">
      <div style={grid2}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}

function WorksPage() {
  return (
    <Section title="成果物">
      <div style={{ display: "grid", gap: 16 }}>
        {works.map((item) => (
          <Card key={item.id}>
            <Tag>{item.date}</Tag>
            <h2 style={cardTitle}>{item.title}</h2>
            <p style={cardText}>{item.summary}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function WarehousePage({ setCurrentPage }) {
  return (
    <Section title="倉庫">
      <div style={grid2}>
        <Card>
          <div style={warehouseHead}>鑑賞記録</div>
          <p style={cardText}>
            展示鑑賞の記録、会話、感想、気づき、疑問などを蓄積する倉庫。
          </p>
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {records.map((record) => (
              <button
                key={record.id}
                onClick={() => setCurrentPage(`record:${record.id}`)}
                style={listButton}
              >
                <span>{record.title}</span>
                <span style={{ opacity: 0.7 }}>{record.date}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div style={warehouseHead}>天★Que新聞アーカイブ</div>
          <p style={cardText}>
            過去の天★Que新聞やお知らせを蓄積していくアーカイブ。
          </p>
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {archiveItems.map((item) => (
              <div key={item.id} style={archiveBox}>
                <strong>{item.title}</strong>
                <div style={{ marginTop: 6, fontSize: 14 }}>{item.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function AboutPage() {
  return (
    <Section title="ABOUT">
      <Card>
        <h2 style={{ ...cardTitle, marginTop: 0 }}>天★Queとは</h2>
        <p style={{ ...cardText, whiteSpace: "pre-wrap", lineHeight: 2 }}>
          {siteInfo.description}
        </p>
      </Card>
    </Section>
  );
}

function RecordPage({ record, setCurrentPage }) {
  if (!record) return null;

  return (
    <Section title="鑑賞記録">
      <Card>
        <Tag>{record.date}</Tag>
        <h1
          style={{
            marginTop: 12,
            marginBottom: 12,
            fontSize: 34,
            color: COLORS.blue,
            lineHeight: 1.3,
          }}
        >
          {record.title}
        </h1>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {record.tags.map((tag) => (
            <span key={tag} style={tagPill}>
              #{tag}
            </span>
          ))}
        </div>

        {record.blocks.map((block, index) => {
          if (block.type === "text") {
            return (
              <p
                key={index}
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 2.1,
                  fontSize: 17,
                  color: COLORS.black,
                  marginBottom: 24,
                }}
              >
                {block.content}
              </p>
            );
          }

          if (block.type === "image") {
            return (
              <figure key={index} style={{ margin: "0 0 28px 0" }}>
                <div
                  style={{
                    background: COLORS.gray,
                    border: `3px solid ${COLORS.black}`,
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  <img
                    src={block.src}
                    alt={block.alt || ""}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: 14,
                    }}
                  />
                </div>
                {block.caption ? (
                  <figcaption
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "#444",
                    }}
                  >
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          return null;
        })}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
          <button onClick={() => setCurrentPage("warehouse")} style={ctaSecondary}>
            倉庫に戻る
          </button>
          <button onClick={() => setCurrentPage("home")} style={ctaPrimary}>
            TOPへ戻る
          </button>
        </div>
      </Card>
    </Section>
  );
}

function ProductCard({ product }) {
  return (
    <Card>
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 18,
          overflow: "hidden",
          border: `3px solid ${COLORS.black}`,
          background: COLORS.yellow2,
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.blue,
          fontWeight: 900,
          fontSize: 18,
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          "商品画像"
        )}
      </div>

      <div style={{ display: "inline-block", ...promoBadge, marginBottom: 10 }}>
        {product.badge}
      </div>

      <h3 style={cardTitle}>{product.name}</h3>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: COLORS.red,
          marginBottom: 12,
        }}
      >
        {product.price}
      </div>
      <p style={cardText}>{product.description}</p>
      <button style={ctaPrimary}>詳細を見る</button>
    </Card>
  );
}

function Section({ title, children }) {
  return (
    <section
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "26px 16px",
      }}
    >
      <div
        style={{
          background: COLORS.blue,
          color: COLORS.white,
          border: `3px solid ${COLORS.black}`,
          borderRadius: 18,
          padding: "12px 18px",
          fontWeight: 900,
          fontSize: 26,
          marginBottom: 18,
          boxShadow: "6px 6px 0 rgba(0,0,0,0.1)",
        }}
      >
        {title}
      </div>
      {children}
    </section>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `3px solid ${COLORS.black}`,
        borderRadius: 24,
        padding: 20,
        boxShadow: "8px 8px 0 rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}

function Tag({ children, red = false }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: red ? COLORS.red : COLORS.yellow,
        color: red ? COLORS.white : COLORS.black,
        border: `2px solid ${COLORS.black}`,
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 13,
        fontWeight: 900,
      }}
    >
      {children}
    </span>
  );
}

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 18,
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 18,
};

const cardTitle = {
  marginTop: 10,
  marginBottom: 10,
  fontSize: 24,
  color: COLORS.blue,
  lineHeight: 1.35,
  fontWeight: 900,
};

const cardText = {
  margin: 0,
  lineHeight: 1.9,
  color: COLORS.black,
  fontSize: 16,
};

const ctaPrimary = {
  background: COLORS.red,
  color: COLORS.white,
  border: `3px solid ${COLORS.black}`,
  borderRadius: 999,
  padding: "12px 18px",
  fontWeight: 900,
  fontSize: 16,
  cursor: "pointer",
};

const ctaSecondary = {
  background: COLORS.white,
  color: COLORS.blue,
  border: `3px solid ${COLORS.blue}`,
  borderRadius: 999,
  padding: "12px 18px",
  fontWeight: 900,
  fontSize: 16,
  cursor: "pointer",
};

const smallBtn = {
  background: COLORS.blue,
  color: COLORS.white,
  border: `2px solid ${COLORS.black}`,
  borderRadius: 999,
  padding: "10px 14px",
  fontWeight: 800,
  cursor: "pointer",
};

const promoCardStyle = {
  background: COLORS.white,
  border: `4px solid ${COLORS.black}`,
  borderRadius: 24,
  padding: 18,
  boxShadow: "8px 8px 0 rgba(0,0,0,0.1)",
};

const promoBadge = {
  display: "inline-block",
  background: COLORS.red,
  color: COLORS.white,
  borderRadius: 999,
  padding: "5px 10px",
  fontWeight: 900,
  fontSize: 12,
};

const promoTitle = {
  marginTop: 12,
  fontWeight: 900,
  fontSize: 24,
  color: COLORS.blue,
};

const promoText = {
  marginTop: 10,
  lineHeight: 1.8,
  fontSize: 15,
  color: COLORS.black,
};

const warehouseHead = {
  fontSize: 24,
  fontWeight: 900,
  color: COLORS.blue,
  marginBottom: 10,
};

const archiveBox = {
  border: `2px solid ${COLORS.black}`,
  borderRadius: 14,
  padding: 12,
  background: COLORS.yellow2,
};

const listButton = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  textAlign: "left",
  border: `2px solid ${COLORS.black}`,
  borderRadius: 14,
  padding: "12px 14px",
  background: COLORS.white,
  cursor: "pointer",
  fontWeight: 700,
};

const tagPill = {
  background: COLORS.yellow2,
  color: COLORS.black,
  border: `2px solid ${COLORS.black}`,
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 13,
  fontWeight: 800,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const currentRecord = useMemo(() => {
    if (!currentPage.startsWith("record:")) return null;
    const id = currentPage.replace("record:", "");
    return records.find((r) => r.id === id) || null;
  }, [currentPage]);

  let content = null;

  if (currentPage === "home") content = <Home setCurrentPage={setCurrentPage} />;
  else if (currentPage === "news") content = <NewsPage />;
  else if (currentPage === "shop") content = <ShopPage />;
  else if (currentPage === "works") content = <WorksPage />;
  else if (currentPage === "warehouse") content = <WarehousePage setCurrentPage={setCurrentPage} />;
  else if (currentPage === "about") content = <AboutPage />;
  else if (currentPage.startsWith("record:")) {
    content = <RecordPage record={currentRecord} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.gray} 0%, ${COLORS.white} 100%)`,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif',
      }}
    >
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {content}

      <footer
        style={{
          marginTop: 40,
          background: COLORS.blue,
          color: COLORS.white,
          padding: "28px 16px",
          borderTop: `6px solid ${COLORS.red}`,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontWeight: 900, fontSize: 22 }}>{siteInfo.name}</div>
            <div style={{ marginTop: 6 }}>{siteInfo.catch}</div>
          </div>
          <div style={{ opacity: 0.9 }}>© 天★Que</div>
        </div>
      </footer>
    </div>
  );
}