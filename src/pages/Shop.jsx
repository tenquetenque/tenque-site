import products from "../data/products";
import "./Shop.css";

function Shop() {
  return (
    <div className="shop-page">

      <div className="shop-header">

  <img
    src="/images/shop-logo.png"
    alt="天★Queオンラインショップ"
    className="shop-logo"
  />

</div>
<div
  className="featured-banner"
  onClick={() => {
    window.location.href = "/shop/TQ-001";
  }}
>
  <p className="featured-title">
    今月のおすすめ商品
  </p>

  <h2 className="featured-name">
    た★スケール
  </h2>

  <p className="featured-code">
    商品コード：TQ-001
  </p>
</div>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
          >

            <div
              className="image-wrapper"
              onClick={() => {
                window.location.href = `/shop/${product.code}`;
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />

              <div className="image-overlay">
                ▶ 商品を見る
              </div>
            </div>

            <p className="product-code">
              商品コード：{product.code}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Shop;