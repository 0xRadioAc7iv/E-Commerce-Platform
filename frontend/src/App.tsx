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
import { AuthProvider } from "./contexts/AuthContext";
import ProductsPage from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
