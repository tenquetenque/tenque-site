import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Cart() {
    const [searchParams] = useSearchParams();
const paid = searchParams.get("paid");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🛒 カート</h1>
      {paid && (
  <div
    style={{
      padding: "20px",
      marginBottom: "30px",
      background: "#e8f5e9",
      border: "1px solid #4caf50",
      borderRadius: "8px",
    }}
  >
    <h2>ご注文ありがとうございます！</h2>
    <p>お支払いが完了しました。</p>
  </div>
)}

      {cart.length === 0 ? (
        <p>カートに商品がありません。</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "20px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />

              <div>
                <h2>{item.title}</h2>

                <p>商品コード：{item.code}</p>

                <p>数量：{item.quantity}</p>

                <p>
                  ¥{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "40px", textAlign: "right" }}>
            <h2>
              商品合計：¥{total.toLocaleString()}
            </h2>

            <p>※送料は購入手続き時に加算されます。</p>

            <button
            onClick={async () => {
  const response = await fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: cart }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("決済ページを作成できませんでした。");
  }
}}
              style={{
                marginTop: "20px",
                padding: "18px 40px",
                fontSize: "20px",
                background: "#d60000",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              購入手続きへ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;