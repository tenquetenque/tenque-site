import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetail() {
  const { code } = useParams();

  const product = products.find((item) => item.code === code);

  if (!product) {
    return <h1>商品が見つかりません。</h1>;
  }

  // 🛒 カートに入れる
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.code === product.code
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        code: product.code,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.title}をカートに入れました！`);

    window.location.href = "/cart";
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "block",
          margin: "0 auto 30px",
        }}
      />

      <p>商品コード：{product.code}</p>

      <h1>{product.title}</h1>

      <h2 style={{ color: "red" }}>
        ¥{product.price.toLocaleString()}（税込）
      </h2>

      <hr />

      <p style={{ whiteSpace: "pre-line" }}>
        {product.description}
      </p>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "18px",
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
  );
}

export default ProductDetail;