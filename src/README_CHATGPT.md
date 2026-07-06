# 天★Queサイト 開発メモ（ChatGPT用）

## プロジェクト概要
React + Viteで制作している天★Que公式サイト。

現在は「天★Que広場」を開発中。

Firebase Firestoreでリアルタイム同期している。

---

# 現在の仕様

## キャラクター
- 1ID = 1キャラクター
- myIdはlocalStorageで管理
- FirestoreのdocumentIDはmyId
- CharacterUIで名前と画像を選択する
- playerは
  {
    name,
    char
  }
  を持つ

※ emojiではなく char を使う

---

## Firestore

collection
characters

documentID
myId

各ドキュメント

{
  uid,
  name,
  emoji,
  x,
  y,
  messages,
  time
}

---

## Home.jsx

役割

・Firebase同期
・コメント送信
・クリック移動
・ログアウト

---

## Hiroba.jsx

役割

charactersを表示するだけ。

Firestoreは触らない。

---

## CharacterUI.jsx

役割

名前入力

キャラクター選択

onChange({
  name,
  char
})

をHomeへ渡す。

---

# 完成済み

✅ Firebase同期

✅ 1IDにつき1キャラクター

---

# 現在残っている課題

①クリック移動が完全ではない

②コメントは1時間で消えるようにしたい

③ログアウトするとlocalStorageも消す

④スマホでコメント送信

⑤自分だけYOU表示

⑥プロフィール表示

⑦入室音

⑧最終発言順で前面表示

⑨自分だけドラッグ移動

---

# 開発ルール

一度に1つだけ修正する。

複数機能を同時に変更しない。

コードを削除するときは必ず理由を書く。

ChatGPTは修正箇所だけを提示する。

ファイル全体は基本的に書き換えない。