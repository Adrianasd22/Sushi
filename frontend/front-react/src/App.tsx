import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import TablesPage from "./pages/TablesPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import RestaurantMapPage from "./pages/RestaurantMapPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import ProductFormPage from "./pages/ProductFormPage.tsx";
import { ToastProvider } from "./components/context/ToastContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AdminRoute from "./components/login/AdminRoute.tsx";
import CategoryFormPage from "./pages/CategoryFormPage.tsx";
import UserFormPage from "./pages/UserFormPage.tsx";
import ProtectedRoute from "./components/login/ProtectedRoute.tsx";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/tables-map" element={<RestaurantMapPage />} />
          <Route path="/orders" element={<OrdersPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products/new" element={<ProductFormPage />} />
            <Route path="/categories/new" element={<CategoryFormPage />} />
            <Route path="/users/new" element={<UserFormPage />} />
            <Route path="/products/:id/edit" element={<ProductFormPage />} />
            <Route path="/categories/:id/edit" element={<CategoryFormPage />} />
            <Route path="/users/:id/edit" element={<UserFormPage />} />
          </Route>
        </Route>

        {/* Fuera de ProtectedRoute para que cualquiera vea el 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
