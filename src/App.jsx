import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderComplete from "./pages/OrderComplete";
import Newspaper from "./pages/Newspaper";
import NewspaperDetail from "./pages/NewspaperDetail";



function App() {
  return (
    <BrowserRouter>
      <Header />
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/shop/:code" element={<ProductDetail />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/newspaper" element={<Newspaper />} />
   <Route path="/newspaper/:id" element={<NewspaperDetail />} />
  <Route path="/order-complete" element={<OrderComplete />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
