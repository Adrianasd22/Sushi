// Detectar la URL de la API según el entorno
const getApiUrl = () => {
  // Si está en desarrollo local
  if (import.meta.env.DEV) {
    return 'http://localhost:8000/api';
  }
  
  // En producción, usa el mismo host pero puerto 8000
  // Reemplaza con la IP del backend en producción
  return `http://sushimiyu2-api.duckdns.org/api`;
};

const getStorageUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8080/storage/';
  }
  return `https://sushi-imagenes-tfg.s3.us-east-1.amazonaws.com/`;
};

export const env = {
    API_URL: getApiUrl(),
    STORAGE_URL: getStorageUrl(),
};