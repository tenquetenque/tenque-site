import React, { useEffect, useMemo, useRef, useState } from "react";

// =========================================================
// 天★Que 公式サイト / App.jsx 丸ごと差し替え版（第一段階）
// - ジャパネット風の企業サイトっぽい骨格
// - 天★Que広場（トップの遊べるエリア）
// - 鑑賞記録 / 天★Queニュース / 通販 / 成果物 / 倉庫
// - 倉庫内に 鑑賞記録 / 天★Que新聞アーカイブ
// - 鑑賞記録は「ブロック式」画像差し込み可能
// - 投稿フォームは第一段階（ローカル保存）
// ※ 「誰でも投稿して全員に共有」は次段階で Supabase 接続が必要
// =========================================================

const SITE_TITLE = "天★Que";

// ---------------------------------------------------------
// ここにロゴ画像を入れたい場合：public フォルダに置いてファイル名を書く
// 例: public/tenque-logo.png → "tenque-logo.png"
// まだ無い場合は null のままでOK
// ---------------------------------------------------------
const LOGO_FILE = null; // 例: "tenque-logo.png"

// ---------------------------------------------------------
// 既存の鑑賞記録（ここに村井さんの“全文そのまま”を入れる場所）
// ---------------------------------------------------------
// 重要：本文は content の中にそのままコピペしてください（修文しない）
// 画像は blocks の好きな位置に { type: "image", ... } を挿入
// いまはサンプル1件だけ入れています。
// ---------------------------------------------------------
const initialRecords = [
  {
    id: "record-1",
    slug: "hori-koya-kansho-2025-08-28",
    title: "堀浩哉 鑑賞記録",
    author: "村井",
    date: "2025.8.28",
    excerpt:
      "※ここに、さっきのPDFの全文を“そのまま”入れていくための土台です。今は動作確認用のサンプル。",
    heroImage: null,
    blocks: [
      {
        type: "text",
        content: `堀浩哉　鑑賞記録　2025.8.28\n\nここは今、動作確認用のサンプルです。\n\nこの text ブロックの中身を消して、\n村井さんがPDFから持ってきた全文を、そのままコピペしてください。\n\n改行もそのままでOKです。`,
      },
      {
        type: "image",
        src: "IMG_2244.jpg",
        alt: "天★Que広場の参考画像",
        caption: "参考イメージ（public に画像がある場合はそのまま表示）",
      },
      {
        type: "text",
        content: `本文の途中にも、こうやって image ブロックを何個でも差し込めます。\n\n後で好きなところに入れていけばOK。`,
      },
    ],
  },
];

// ---------------------------------------------------------
// ニュース（サンプル）
// ---------------------------------------------------------
const newsItems = [
  {
    id: "news-1",
    date: "2026.03.30",
    title: "天★Queサイト 試験公開中",
    body: "鑑賞記録、ニュース、通販、成果物、倉庫を含む第一段階版を公開。",
  },
  {
    id: "news-2",
    date: "2026.03.30",
    title: "天★Que広場 実装開始",
    body: "トップでキャラクターを置いて、コメントを吹き出し表示できる遊べる広場を追加。",
  },
];

// ---------------------------------------------------------
// 通販（サンプル）
// ---------------------------------------------------------
const shopItems = [
  {
    id: "shop-1",
    name: "天★Que新聞（仮）",
    price: "¥500",
    image: null,
    desc: "アーカイブと連動予定。まずはダミー表示。",
  },
  {
    id: "shop-2",
    name: "鑑賞記録プリント（仮）",
    price: "¥1,200",
    image: null,
    desc: "今後PDFや冊子展開にも接続しやすい商品枠。",
  },
  {
    id: "shop-3",
    name: "天★Queグッズ（仮）",
    price: "¥2,000",
    image: null,
    desc: "ロゴ・キャラクター展開の土台。",
  },
];

// ---------------------------------------------------------
// 成果物（サンプル）
// ---------------------------------------------------------
const outputs = [
  {
    id: "output-1",
    title: "動かせる絵画（関連記録）",
    desc: "作品や展示、鑑賞者の反応、派生テキストをまとめていく枠。",
  },
  {
    id: "output-2",
    title: "天★Que実験アーカイブ",
    desc: "今後、動画・PDF・画像・会話記録などを整理して蓄積。",
  },
];

// ---------------------------------------------------------
// 天★Que新聞アーカイブ（サンプル）
// ---------------------------------------------------------
const newspaperArchive = [
  {
    id: "paper-1",
    title: "天★Que新聞 第1号（仮）",
    date: "2026.03.30",
    desc: "あとでPDFリンクや画像サムネイルに差し替え可能。",
  },
];

// ---------------------------------------------------------
// キャラクター定義（天★Que広場）
// ---------------------------------------------------------
const characterOptions = [
  { id: "star", label: "星", emoji: "⭐" },
  { id: "flower", label: "花", emoji: "🌸" },
  { id: "cat", label: "猫", emoji: "🐈" },
  { id: "rabbit", label: "うさぎ", emoji: "🐇" },
  { id: "bird", label: "鳥", emoji: "🕊️" },
  { id: "bear", label: "くま", emoji: "🧸" },
  { id: "fish", label: "魚", emoji: "🐟" },
  { id: "cloud", label: "雲", emoji: "☁️" },
  { id: "moon", label: "月", emoji: "🌙" },
  { id: "heart", label: "ハート", emoji: "💖" },
];

const colorOptions = [
  "#ffffff",
  "#ffe6f2",
  "#fff7cc",
  "#d8f3ff",
  "#e6ffe6",
  "#e9ddff",
  "#ffd6a5",
];

// ---------------------------------------------------------
// ユーティリティ
// ---------------------------------------------------------
function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------
// App
// ---------------------------------------------------------
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRecordId, setSelectedRecordId] = useState(initialRecords[0]?.id || null);

  const [localRecords, setLocalRecords] = useState(() => safeParse("tenque_local_records", []));
  const allRecords = useMemo(() => [...localRecords, ...initialRecords], [localRecords]);
  const selectedRecord = useMemo(
    () => allRecords.find((r) => r.id === selectedRecordId) || allRecords[0] || null,
    [allRecords, selectedRecordId]
  );

  useEffect(() => {
    localStorage.setItem("tenque_local_records", JSON.stringify(localRecords));
  }, [localRecords]);

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-4 md:px-6">
        {activeTab === "home" && <HomeTop setActiveTab={setActiveTab} />}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              allRecords={allRecords}
              setSelectedRecordId={setSelectedRecordId}
            />
          </aside>

          <section className="lg:col-span-9">
            {activeTab === "home" && (
              <HomeDashboard
                setActiveTab={setActiveTab}
                records={allRecords}
                newsItems={newsItems}
                shopItems={shopItems}
                outputs={outputs}
              />
            )}

            {activeTab === "records" && (
              <RecordsPage
                records={allRecords}
                selectedRecord={selectedRecord}
                setSelectedRecordId={setSelectedRecordId}
                onCreateLocalRecord={(record) => {
                  setLocalRecords((prev) => [record, ...prev]);
                  setSelectedRecordId(record.id);
                }}
              />
            )}

            {activeTab === "news" && <NewsPage newsItems={newsItems} />}
            {activeTab === "shop" && <ShopPage shopItems={shopItems} />}
            {activeTab === "outputs" && <OutputsPage outputs={outputs} />}
            {activeTab === "storage" && (
              <StoragePage
                records={allRecords}
                setActiveTab={setActiveTab}
                newspaperArchive={newspaperArchive}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------
// Header
// ---------------------------------------------------------
function Header({ activeTab, setActiveTab }) {
  const tabs = [
    ["home", "TOP"],
    ["records", "鑑賞記録"],
    ["news", "天★Queニュース"],
    ["shop", "通販ページ"],
    ["outputs", "成果物"],
    ["storage", "倉庫"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b-4 border-red-600 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-red-500 bg-gradient-to-br from-yellow-200 via-pink-100 to-sky-100 shadow">
              {LOGO_FILE ? (
                <img src={LOGO_FILE} alt="天★Que ロゴ" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black text-red-600">天★Q</span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-red-600">公式サイト / ONLINE</p>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">{SITE_TITLE}</h1>
              <p className="text-xs text-slate-500 md:text-sm">鑑賞記録・ニュース・通販・成果物・倉庫</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {tabs.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={classNames(
                  "rounded-full border px-4 py-2 text-sm font-bold transition",
                  activeTab === key
                    ? "border-red-600 bg-red-600 text-white shadow"
                    : "border-slate-300 bg-white text-slate-700 hover:border-red-300 hover:text-red-600"
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------
// Home top hero = 天★Que広場
// ---------------------------------------------------------
function HomeTop({ setActiveTab }) {
  return (
    <section className="overflow-hidden rounded-[28px] border-4 border-yellow-300 bg-white shadow-2xl">
      <div className="border-b bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 px-5 py-3 text-white">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.25em]">SPECIAL CONTENT</p>
            <h2 className="text-2xl font-black md:text-3xl">天★Que広場</h2>
          </div>
          <button
            onClick={() => setActiveTab("records")}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-red-600"
          >
            鑑賞記録を見る →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <PlazaCanvas />
        </div>
        <div className="border-l border-slate-200 bg-[#fffdf7] p-4 lg:col-span-4">
          <h3 className="mb-3 text-lg font-black text-slate-800">広場の説明</h3>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>・クリックすると星や花がふわっと出ます。</p>
            <p>・キャラクターを選んで、広場に追加できます。</p>
            <p>・コメントを書くと、頭上に吹き出しが出ます。</p>
            <p>・キャラクターはドラッグして動かせます。</p>
            <p>・今は第一段階なので、広場の内容はこのブラウザ内だけ保存されます。</p>
          </div>
          <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-slate-700">
            <p className="font-bold text-red-600">次段階でできること</p>
            <p className="mt-2">Supabaseをつなぐと、「みんなが置いたキャラやコメントを共有」も可能になります。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlazaCanvas() {
  const boardRef = useRef(null);
  const [sprites, setSprites] = useState(() => safeParse("tenque_plaza_sprites", []));
  const [effects, setEffects] = useState([]);
  const [selectedChar, setSelectedChar] = useState(characterOptions[0]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [comment, setComment] = useState("");
  const dragRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tenque_plaza_sprites", JSON.stringify(sprites));
  }, [sprites]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current || !boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
      const y = Math.max(30, Math.min(rect.height - 20, e.clientY - rect.top));
      const id = dragRef.current;
      setSprites((prev) => prev.map((s) => (s.id === id ? { ...s, x, y } : s)));
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const spawnEffects = (x, y) => {
    const batch = Array.from({ length: 8 }).map((_, i) => ({
      id: uid("fx"),
      x,
      y,
      dx: (Math.random() - 0.5) * 120,
      dy: -40 - Math.random() * 80,
      delay: i * 20,
      icon: Math.random() > 0.5 ? "✨" : "🌸",
    }));
    setEffects((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setEffects((prev) => prev.filter((f) => !batch.some((b) => b.id === f.id)));
    }, 1400);
  };

  const handleBoardClick = (e) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnEffects(x, y);
  };

  const addCharacter = () => {
    const next = {
      id: uid("sprite"),
      x: 140 + Math.random() * 280,
      y: 180 + Math.random() * 120,
      emoji: selectedChar.emoji,
      label: selectedChar.label,
      color: selectedColor,
      bubble: comment.trim() || "こんにちは！",
    };
    setSprites((prev) => [...prev, next]);
    setComment("");
  };

  const updateBubble = (id) => {
    if (!comment.trim()) return;
    setSprites((prev) => prev.map((s) => (s.id === id ? { ...s, bubble: comment.trim() } : s)));
    setComment("");
  };

  const clearAll = () => {
    setSprites([]);
    localStorage.removeItem("tenque_plaza_sprites");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b bg-[#f7fbff] p-3">
        <select
          value={selectedChar.id}
          onChange={(e) => setSelectedChar(characterOptions.find((c) => c.id === e.target.value) || characterOptions[0])}
          className="rounded-xl border px-3 py-2 text-sm"
        >
          {characterOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 rounded-xl border bg-white px-2 py-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className={classNames(
                "h-6 w-6 rounded-full border-2",
                selectedColor === c ? "border-slate-900" : "border-white"
              )}
              style={{ background: c }}
            />
          ))}
        </div>

        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力"
          className="min-w-[180px] flex-1 rounded-xl border px-3 py-2 text-sm"
        />

        <button onClick={addCharacter} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white">
          キャラを追加
        </button>
        <button onClick={clearAll} className="rounded-xl border px-4 py-2 text-sm font-bold">
          全消去
        </button>
      </div>

      <div
        ref={boardRef}
        onClick={handleBoardClick}
        className="relative h-[520px] overflow-hidden bg-gradient-to-b from-[#dff5ff] via-[#eafcff] to-[#fdf7ff]"
      >
        {/* 背景のやさしいデジタル感 */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white blur-2xl" />
          <div className="absolute right-16 top-14 h-24 w-24 rounded-full bg-pink-200 blur-2xl" />
          <div className="absolute left-1/3 top-10 h-16 w-28 rounded-full bg-yellow-100 blur-2xl" />
        </div>

        {/* 雲 */}
        <div className="absolute left-10 top-10 text-5xl opacity-70">☁️</div>
        <div className="absolute right-24 top-16 text-4xl opacity-70">☁️</div>

        {/* 建物っぽい後景 */}
        <div className="absolute bottom-32 left-0 right-0 flex items-end justify-center gap-4 px-6 opacity-70">
          {[120, 90, 140, 110, 160, 100].map((h, i) => (
            <div
              key={i}
              className="rounded-t-3xl border border-white/60 bg-white/60"
              style={{ width: 70, height: h }}
            />
          ))}
        </div>

        {/* 芝生 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-[#c9f7c5] to-[#8ee28a]" />

        {/* 噴水 */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-white/80 bg-sky-100 shadow-xl">
            <div className="absolute bottom-5 h-12 w-28 rounded-full bg-sky-300/70" />
            <div className="absolute bottom-12 h-16 w-5 rounded-full bg-sky-300" />
            <div className="absolute bottom-24 text-3xl">💧</div>
            <div className="absolute bottom-0 text-2xl">⛲</div>
          </div>
        </div>

        {/* 花壇 */}
        <div className="absolute bottom-10 left-10 text-3xl">🌷🌼🌸</div>
        <div className="absolute bottom-10 right-10 text-3xl">🌸🌼🌷</div>

        {/* エフェクト */}
        {effects.map((fx) => (
          <span
            key={fx.id}
            className="pointer-events-none absolute text-xl"
            style={{
              left: fx.x,
              top: fx.y,
              transform: `translate(${fx.dx}px, ${fx.dy}px)`,
              transition: "transform 1.2s ease-out, opacity 1.2s ease-out",
              opacity: 0,
              animation: `fadeFloat 1.2s ease-out ${fx.delay}ms forwards`,
            }}
          >
            {fx.icon}
          </span>
        ))}

        {/* キャラ */}
        {sprites.map((s) => (
          <div
            key={s.id}
            className="absolute select-none"
            style={{ left: s.x, top: s.y, transform: "translate(-50%, -50%)" }}
          >
            {s.bubble && (
              <div className="absolute -top-16 left-1/2 min-w-[90px] -translate-x-1/2 rounded-2xl border bg-white px-3 py-2 text-center text-xs shadow-lg">
                {s.bubble}
              </div>
            )}
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
                dragRef.current = s.id;
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                updateBubble(s.id);
              }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-3xl shadow-xl"
              style={{ background: s.color }}
              title="ドラッグで移動 / ダブルクリックで最新コメントに更新"
            >
              {s.emoji}
            </button>
          </div>
        ))}

        <style>{`
          @keyframes fadeFloat {
            0% { opacity: 1; transform: translate(0px, 0px) scale(1); }
            100% { opacity: 0; transform: translate(var(--dx, 0px), var(--dy, -80px)) scale(1.3); }
          }
        `}</style>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Sidebar
// ---------------------------------------------------------
function Sidebar({ activeTab, setActiveTab, allRecords, setSelectedRecordId }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border bg-white p-4 shadow">
        <p className="text-xs font-bold tracking-[0.2em] text-red-600">MENU</p>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {[
            ["records", "鑑賞記録"],
            ["news", "天★Queニュース"],
            ["shop", "通販ページ"],
            ["outputs", "成果物"],
            ["storage", "倉庫"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={classNames(
                "rounded-2xl border px-4 py-3 text-left text-sm font-bold",
                activeTab === key ? "border-red-600 bg-red-50 text-red-600" : "hover:border-red-300"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-4 shadow">
        <p className="text-xs font-bold tracking-[0.2em] text-red-600">鑑賞記録ショートカット</p>
        <div className="mt-3 space-y-2">
          {allRecords.slice(0, 6).map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setActiveTab("records");
                setSelectedRecordId(r.id);
              }}
              className="w-full rounded-2xl border px-3 py-3 text-left text-sm hover:border-red-300"
            >
              <div className="font-bold">{r.title}</div>
              <div className="text-xs text-slate-500">{r.date}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Home dashboard
// ---------------------------------------------------------
function HomeDashboard({ setActiveTab, records, newsItems, shopItems, outputs }) {
  return (
    <div className="space-y-6">
      <SectionCard title="おすすめ導線" subtitle="通販サイト / 企業サイトっぽく大きく見せる">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PromoButton title="鑑賞記録" desc="記録を読む / 投稿する" onClick={() => setActiveTab("records")} />
          <PromoButton title="天★Queニュース" desc="更新情報を見る" onClick={() => setActiveTab("news")} />
          <PromoButton title="通販ページ" desc="商品や頒布物を見る" onClick={() => setActiveTab("shop")} />
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard title="新着鑑賞記録" subtitle="NEW RECORDS" className="xl:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {records.slice(0, 4).map((r) => (
              <div key={r.id} className="rounded-3xl border p-4">
                <div className="text-xs text-slate-500">{r.date}</div>
                <div className="mt-1 text-lg font-black">{r.title}</div>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{r.excerpt}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="新着ニュース" subtitle="NEWS">
          <div className="space-y-3">
            {newsItems.slice(0, 3).map((n) => (
              <div key={n.id} className="rounded-2xl border p-3">
                <div className="text-xs text-slate-500">{n.date}</div>
                <div className="font-bold">{n.title}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="通販ページ（プレビュー）" subtitle="SHOP">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {shopItems.map((item) => (
              <div key={item.id} className="rounded-3xl border p-4">
                <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-100 text-4xl">
                  {item.image ? <img src={item.image} alt={item.name} className="h-full w-full rounded-2xl object-cover" /> : "🛒"}
                </div>
                <div className="mt-3 font-black">{item.name}</div>
                <div className="text-red-600">{item.price}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="成果物（プレビュー）" subtitle="OUTPUTS">
          <div className="space-y-4">
            {outputs.map((o) => (
              <div key={o.id} className="rounded-3xl border p-4">
                <div className="font-black">{o.title}</div>
                <div className="mt-1 text-sm text-slate-600">{o.desc}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function PromoButton({ title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-3xl border-2 border-yellow-300 bg-gradient-to-br from-white to-yellow-50 p-5 text-left shadow hover:-translate-y-0.5"
    >
      <div className="text-lg font-black text-red-600">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{desc}</div>
    </button>
  );
}

// ---------------------------------------------------------
// Records page
// ---------------------------------------------------------
function RecordsPage({ records, selectedRecord, setSelectedRecordId, onCreateLocalRecord }) {
  return (
    <div className="space-y-6">
      <SectionCard title="鑑賞記録" subtitle="READ / POST">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <RecordPostForm onCreate={onCreateLocalRecord} />
          </div>
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {records.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRecordId(r.id)}
                  className={classNames(
                    "rounded-3xl border p-4 text-left",
                    selectedRecord?.id === r.id ? "border-red-500 bg-red-50" : "hover:border-red-300"
                  )}
                >
                  <div className="text-xs text-slate-500">{r.date}</div>
                  <div className="mt-1 text-lg font-black">{r.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{r.author}</div>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{r.excerpt}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {selectedRecord && <RecordViewer record={selectedRecord} />}
    </div>
  );
}

function RecordPostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  return (
    <div className="rounded-3xl border bg-[#fffdf7] p-4">
      <div className="text-lg font-black text-red-600">投稿フォーム（第一段階）</div>
      <p className="mt-2 text-sm text-slate-600">
        今はこのブラウザ内だけ保存。次段階でSupabase接続すると、誰でも投稿・共有にできます。
      </p>

      <div className="mt-4 space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="w-full rounded-2xl border px-3 py-2" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="記録者名" className="w-full rounded-2xl border px-3 py-2" />
        <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="日付（例 2026.03.30）" className="w-full rounded-2xl border px-3 py-2" />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="本文（改行そのままOK）"
          rows={10}
          className="w-full rounded-2xl border px-3 py-2"
        />

        <label className="block rounded-2xl border border-dashed p-3 text-sm">
          画像を1枚追加（サンプル）
          <input
            type="file"
            accept="image/*"
            className="mt-2 block"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setImageFile(file);
              const reader = new FileReader();
              reader.onload = () => setImagePreview(reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </label>

        {imagePreview && <img src={imagePreview} alt="preview" className="rounded-2xl border" />}

        <button
          onClick={() => {
            if (!title.trim() || !body.trim()) {
              alert("タイトルと本文を入れてください");
              return;
            }
            const newRecord = {
              id: uid("local-record"),
              slug: uid("slug"),
              title: title.trim(),
              author: author.trim() || "匿名",
              date: date.trim() || new Date().toLocaleDateString("ja-JP"),
              excerpt: body.trim().slice(0, 80),
              heroImage: imagePreview || null,
              blocks: [
                { type: "text", content: body },
                ...(imagePreview
                  ? [
                      {
                        type: "image",
                        src: imagePreview,
                        alt: title.trim(),
                        caption: imageFile?.name || "投稿画像",
                      },
                    ]
                  : []),
              ],
            };
            onCreate(newRecord);
            setTitle("");
            setAuthor("");
            setDate("");
            setBody("");
            setImageFile(null);
            setImagePreview(null);
            alert("このブラウザ内に保存しました（第一段階）");
          }}
          className="w-full rounded-2xl bg-red-600 px-4 py-3 font-black text-white"
        >
          投稿する（ローカル保存）
        </button>
      </div>
    </div>
  );
}

function RecordViewer({ record }) {
  return (
    <SectionCard title={record.title} subtitle={`${record.author} / ${record.date}`}>
      <article className="mx-auto max-w-4xl">
        {record.heroImage && (
          <img src={record.heroImage} alt={record.title} className="mb-6 w-full rounded-3xl border object-cover" />
        )}

        <div className="space-y-6">
          {record.blocks.map((block, idx) => {
            if (block.type === "text") {
              return (
                <div key={idx} className="rounded-3xl border bg-white p-5">
                  <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-800">{block.content}</p>
                </div>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={idx} className="rounded-3xl border bg-white p-4">
                  <img src={block.src} alt={block.alt || ""} className="w-full rounded-2xl object-cover" />
                  {block.caption && <figcaption className="mt-3 text-sm text-slate-500">{block.caption}</figcaption>}
                </figure>
              );
            }

            return null;
          })}
        </div>
      </article>
    </SectionCard>
  );
}

// ---------------------------------------------------------
// News
// ---------------------------------------------------------
function NewsPage({ newsItems }) {
  return (
    <SectionCard title="天★Queニュース" subtitle="NEWS ARCHIVE">
      <div className="space-y-4">
        {newsItems.map((n) => (
          <div key={n.id} className="rounded-3xl border p-5">
            <div className="text-xs text-slate-500">{n.date}</div>
            <div className="mt-1 text-xl font-black">{n.title}</div>
            <p className="mt-3 text-sm leading-7 text-slate-700">{n.body}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------
// Shop
// ---------------------------------------------------------
function ShopPage({ shopItems }) {
  return (
    <SectionCard title="通販ページ" subtitle="ONLINE SHOP (DEMO)">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shopItems.map((item) => (
          <div key={item.id} className="rounded-3xl border-2 border-yellow-200 bg-white p-4 shadow">
            <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-100 text-5xl">
              {item.image ? <img src={item.image} alt={item.name} className="h-full w-full rounded-2xl object-cover" /> : "📦"}
            </div>
            <div className="mt-4 text-lg font-black">{item.name}</div>
            <div className="mt-1 text-2xl font-black text-red-600">{item.price}</div>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            <button className="mt-4 w-full rounded-2xl bg-red-600 px-4 py-3 font-black text-white">詳細を見る（仮）</button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------
// Outputs
// ---------------------------------------------------------
function OutputsPage({ outputs }) {
  return (
    <SectionCard title="成果物" subtitle="OUTPUTS">
      <div className="space-y-4">
        {outputs.map((o) => (
          <div key={o.id} className="rounded-3xl border p-5">
            <div className="text-xl font-black">{o.title}</div>
            <p className="mt-2 text-sm leading-7 text-slate-700">{o.desc}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------
// Storage
// ---------------------------------------------------------
function StoragePage({ records, setActiveTab, newspaperArchive }) {
  return (
    <SectionCard title="倉庫" subtitle="ARCHIVE STORAGE">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <button
          onClick={() => setActiveTab("records")}
          className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-6 text-left"
        >
          <div className="text-xl font-black text-sky-700">鑑賞記録</div>
          <div className="mt-2 text-sm text-slate-700">現在 {records.length} 件。ブロック式で画像差し込み可能。</div>
        </button>

        <div className="rounded-3xl border-2 border-yellow-200 bg-yellow-50 p-6">
          <div className="text-xl font-black text-yellow-700">天★Que新聞アーカイブ</div>
          <div className="mt-4 space-y-3">
            {newspaperArchive.map((p) => (
              <div key={p.id} className="rounded-2xl border bg-white p-4">
                <div className="text-xs text-slate-500">{p.date}</div>
                <div className="font-bold">{p.title}</div>
                <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------
// Shared section card
// ---------------------------------------------------------
function SectionCard({ title, subtitle, children, className }) {
  return (
    <section className={classNames("rounded-[28px] border bg-white p-5 shadow-xl", className)}>
      <div className="mb-5 flex flex-col gap-1 border-b pb-4">
        <div className="text-xs font-bold tracking-[0.2em] text-red-600">{subtitle}</div>
        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  );
}
// test123
// test123


