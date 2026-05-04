import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import type { Category } from "../../types/category";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../context/ConfirmDialog";
import { deleteCategory } from "../../services/CategoryService";

interface Props {
  category: Category;
}

function CategoryItem({ category }: Props) {
  const navigate = useNavigate();
  const role = useRole();
  const isAdmin = role === "admin";

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCategory(category.id);
      showToast("Categoría eliminada", "success");
      setOpenConfirm(false);
      window.location.reload();
    } catch {
      showToast("Error al eliminar", "error");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-zinc-100 font-medium">{category.name}</span>

      <span className="text-zinc-500 text-sm">ID: {category.id}</span>
      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/categories/${category.id}/edit`)}
            className="p-2 hover:bg-zinc-800 rounded-md"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => setOpenConfirm(true)}
            className="p-2 hover:bg-red-600/20 rounded-md text-red-400"
          >
            <Trash2 size={16} />
          </button>
          <ConfirmDialog
            open={openConfirm}
            message="¿Desea eliminar esta categoría?"
            onConfirm={handleDelete}
            onCancel={() => setOpenConfirm(false)}
            loading={deleting}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryItem;
