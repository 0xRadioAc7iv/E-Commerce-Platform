import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./pages/success";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import OrdersPage from "./pages/Orders";
import PaymentsPage from "./pages/Payments";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import AuthPage from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile/orders" element={<OrdersPage />} />
        <Route path="/profile/payments" element={<PaymentsPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
