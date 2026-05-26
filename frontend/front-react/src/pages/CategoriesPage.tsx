import { useEffect, useState } from "react";
import type { Category } from "../types/category";

import CategoryItem from "../components/category/CategoryItem";
import CategorySkeleton from "../components/category/CategorySkeleton";
import { getCategories } from "../services/CategoryService";
import { useRole } from "../hooks/useRole";
import { useNavigate } from "react-router-dom";

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = useRole();
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-zinc-100">Categorías</h1>
      {isAdmin && (
        <button
          onClick={() => navigate("/categories/new")}
          className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-md hover:bg-white text-sm"
        >
          + Nueva categoría
        </button>
      )}

      {/* LISTA */}
      <div className=" rounded-md divide-y divide-zinc-800 px-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          : categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
