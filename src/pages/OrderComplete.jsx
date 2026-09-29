import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function OrderComplete() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.removeItem("cart");
    if (!sessionId) {
      setError("注文情報が見つかりません。");
      return;
    }

    fetch(
      `/.netlify/functions/get-checkout-session?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        setOrder(data);
      })
      .catch(() => {
        setError("注文情報を取得できませんでした。");
      });
  }, [sessionId]);

  if (error) {
    return (
      <div style={{ maxWidth: "700px", margin: "80px auto", padding: "20px" }}>
        <h1>注文情報を取得できませんでした</h1>
        <p>{error}</p>
        <Link to="/">天★Queトップへ戻る</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ maxWidth: "700px", margin: "80px auto", padding: "20px" }}>
        <h1>ご注文ありがとうございます！</h1>
        <p>注文情報を確認しています……</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "80px auto",
        padding: "20px",
      }}
    >
      <h1>ご注文ありがとうございます！</h1>

      <p>お支払いが完了しました。</p>
      <p>
  確認メール：{order.email}
</p>

      <hr />

      <h2>注文内容</h2>

      {order.items.map((item, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <p>
            <strong>{item.name}</strong>
          </p>
          <p>
            数量：{item.quantity}
          </p>
          <p>
            ¥{item.amount.toLocaleString()}
          </p>
        </div>
      ))}

      <hr />
<p>
  商品合計：¥{order.itemsTotal.toLocaleString()}
</p>

<p>
  送料：¥{order.shipping.toLocaleString()}
</p>

<h2>
  お支払い総額：¥{order.total.toLocaleString()}
</h2>

      <p>ご注文ありがとうございました。</p>

      <Link to="/">天★Queトップへ戻る</Link>
    </div>
  );
}

export default OrderComplete;