// Detectar la URL de la API según el entorno
const getApiUrl = () => {
  // Si está en desarrollo local
  if (import.meta.env.DEV) {
    return 'http://localhost:8000/api';
  }
  
  // En producción, usa el mismo host pero puerto 8000
  // Reemplaza con la IP del backend en producción
  const baseUrl = window.location.hostname;
  return `http://${baseUrl}:8000/api`;
};

const getStorageUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8000/storage/';
  }
  const baseUrl = window.location.hostname;
  return `http://${baseUrl}:8000/storage/`;
};

export const env = {
    API_URL: getApiUrl(),
    STORAGE_URL: getStorageUrl(),
};