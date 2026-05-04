import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import type { Product } from "../../types/products";
import { useToast } from "../context/ToastContext";
import { deleteProduct } from "../../services/productService";
import { useState } from "react";
import ConfirmDialog from "../context/ConfirmDialog";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();
  const role = useRole();
  const isAdmin = role === "admin";
  const [openConfirm, setOpenConfirm] = useState(false);
  const { showToast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product.id);
      showToast("Producto eliminado correctamente", "success");
      setOpenConfirm(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
      showToast("Error al eliminar producto", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Imagen */}
      <div className="w-16 h-16 bg-zinc-700 rounded-md shrink-0" />

      {/* Información */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-zinc-100">{product.name}</h3>
          <span className="text-sm text-zinc-300">{product.price} €</span>
        </div>
        <p className="text-sm text-zinc-400 mt-1">{product.description}</p>
      </div>

      {/* Acciones — solo admin */}
      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setOpenConfirm(true)}
            className="p-2 rounded-md hover:bg-red-600/20 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <ConfirmDialog
        open={openConfirm}
        message="¿Desea eliminar este producto?"
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirm(false)}
        loading={deleting}
      />
    </div>
  );
}

export default ProductItem;
