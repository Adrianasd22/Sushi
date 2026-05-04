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
import ProtectedRoute from "./components/login/ProtectedRoute.tsx";
import AdminRoute from "./components/login/AdminRoute.tsx";

function App() {
  return (
    <>
      {/* Aquí irá el contenido de cada página */}
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas con sidebar */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<ProductFormPage />} />
            <Route path="/products/:id/edit" element={<ProductFormPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/tables-map" element={<RestaurantMapPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<AdminRoute/>}>

            </Route>
          </Route>
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
