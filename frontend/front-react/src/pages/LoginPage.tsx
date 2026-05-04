import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import type { FormErrors, LoginForm } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function validate(form: LoginForm): FormErrors {
  const errors: FormErrors = {};

  if (!form.email) {
    errors.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Introduce un email válido.";
  }

  if (!form.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (form.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  return errors;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { access_token, user } = await loginUser(form.email, form.password);

      localStorage.setItem("token", access_token);
      localStorage.setItem("name", user.name );
      localStorage.setItem("role", user.role); // lo usarás para el CRUD de admin
        console.log("Ha sido autenticado como: ", user.role);
        
      navigate("/", { replace: true });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => setIsLoading(false), 1500); // simulación temporal
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Marca */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 mb-4">
            <Lock className="w-5 h-5 text-zinc-300" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">
            Panel de administración
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Acceso restringido a personal autorizado
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl shadow-black/30">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="usuario@miyu.com"
                  className={`
                    w-full pl-10 pr-4 py-2.5 rounded-lg text-sm
                    bg-zinc-800 text-zinc-100 placeholder-zinc-600
                    border transition-colors outline-none
                    focus:ring-1
                    ${
                      errors.email
                        ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
                        : "border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500/20"
                    }
                  `}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className={`
                    w-full pl-10 pr-10 py-2.5 rounded-lg text-sm
                    bg-zinc-800 text-zinc-100 placeholder-zinc-600
                    border transition-colors outline-none
                    focus:ring-1
                    ${
                      errors.password
                        ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
                        : "border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500/20"
                    }
                  `}
                />
                {apiError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {apiError}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-2.5 px-4 rounded-lg text-sm font-medium
                transition-all duration-150
                ${
                  isLoading
                    ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-100 text-zinc-900 hover:bg-white active:scale-[0.98] cursor-pointer"
                }
              `}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
