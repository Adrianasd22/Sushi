import type { ReactNode } from 'react';

// ✅ Tipar children correctamente
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    window.location.href = 'http://localhost:8080/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;