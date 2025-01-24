import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import OrdersPage from "./pages/Orders";
import PaymentsPage from "./pages/Payments";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import AuthPage from "./pages/Auth";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoute";
import ProductsPage from "./pages/Products";
import ResetPasswordPage from "./pages/ResetPassword";
import ProductSearchPage from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/search" element={<ProductSearchPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
