import { Loader2 } from "lucide-react";
import type { Category } from "../../types/category";
import type { Product, ProductFormData } from "../../types/products";
import { useState } from "react";

interface Props {
  initialData?: Product | null;
  categories: Category[];
  loadingCategories: boolean;
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitting?: boolean;
}

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  category_id: string;
}

function ProductForm({
  initialData,
  categories,
  loadingCategories,
  onSubmit,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Rellenar datos si es edición
  const [form, setForm] = useState<ProductFormState>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        description: initialData.description ?? "",
        price: String(initialData.price),
        category_id: String(initialData.category_id),
      };
    }
    
    return {
      name: "",
      description: "",
      price: "",
      category_id: "",
    };
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category_id: Number(form.category_id),
        image: null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
      {/* IZQUIERDA — imagen (placeholder hasta implementar) */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-500 text-sm">
          Sin imagen
        </div>
        <span className="text-xs text-zinc-600">Disponible próximamente</span>
      </div>

      {/* DERECHA — campos */}
      <div className="flex-1 space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          rows={3}
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none"
        />

        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio"
            required
            className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </div>

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          disabled={loadingCategories}
          required
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-600 disabled:opacity-50"
        >
          {loadingCategories ? (
            <option>Cargando categorías...</option>
          ) : (
            <>
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </>
          )}
        </select>

        {/* Feedback de envío */}
        {isSubmitting && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Guardando producto...
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 rounded-md text-sm font-medium transition-colors
            bg-zinc-100 text-zinc-900 hover:bg-white
            disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : "Guardar producto"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
