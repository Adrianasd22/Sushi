import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.tsx";
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
import ToastContainer from "./components/context/ToastContainer.tsx";
import { ToastProvider } from "./components/context/ToastContext.tsx";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        {/* Aquí irá el contenido de cada página */}
        <ToastProvider>
          <Routes>
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
          </Routes>
        </ToastProvider>
      </main>
    </div>
  );
}

export default App;
