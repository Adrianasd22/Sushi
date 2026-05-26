import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/CategoryService";
import type { Category } from "../types/category";
import type { Product, ProductFilters } from "../types/products";
import ProductSkeleton from "../components/products/ProductSkeleton";
import ProductItem from "../components/products/ProductItem";
import { useRole } from "../hooks/useRole";

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const role = useRole();
  const isAdmin = role === "admin";

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => setLoadingCategories(false));
  }, []);

  useEffect(() => {
    const filters: ProductFilters = {};
    if (search) filters.search = search;
    if (selectedCategory) filters.category_id = Number(selectedCategory);

    const promise = getProducts(filters);

    promise.then((data) => {
      setProducts(data);
      setLoadingProducts(false);
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-100">Productos</h1>

        {isAdmin && (
          <button
            onClick={() => navigate("/products/new")}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo producto
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={loadingCategories}
          className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-100 focus:outline-none disabled:opacity-50"
        >
          {loadingCategories ? (
            <option>Cargando categorías...</option>
          ) : (
            <>
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Lista */}
      <div className="rounded-md divide-y divide-zinc-800 flex flex-col">
        {loadingProducts
          ? Array.from({ length: 5 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
