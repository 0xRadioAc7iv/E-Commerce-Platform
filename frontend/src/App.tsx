import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./pages/success";
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Route>
          </Route>

          <Route path="/profile/orders" element={<OrdersPage />} />
          <Route path="/profile/payments" element={<PaymentsPage />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
