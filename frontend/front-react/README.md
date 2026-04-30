# Frontend React - Dashboard de Sushi

Este proyecto es el frontend desarrollado en React para el dashboard administrativo del sistema de restaurante Sushi. Forma parte de una aplicación más amplia que incluye un backend en Laravel (API REST) y otro frontend en Angular para la parte pública.

## Tecnologías Utilizadas

- **React 19**: Framework principal para la construcción de la interfaz de usuario.
- **TypeScript**: Para tipado estático y mejor desarrollo.
- **Vite**: Herramienta de construcción rápida y moderna.
- **TailwindCSS**: Framework de CSS para estilos utilitarios.
- **React Router DOM**: Para el enrutamiento y navegación entre páginas.
- **Lucide React**: Biblioteca de iconos.
- **ESLint**: Para linting y calidad del código.
- **Babel**: Para transpilación con React Compiler.

## Instalación y Arranque del Proyecto

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio y navega al directorio del frontend React:
   ```
   cd frontend/front-react
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

### Arranque del Proyecto

Para iniciar el servidor de desarrollo:
```
npm run dev
```

Esto iniciará el servidor en `http://localhost:5173` (puerto por defecto de Vite).

### Otros Scripts Disponibles

- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Previsualiza la build de producción.

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables organizados por funcionalidad
│   ├── buttons/         # Botones personalizados
│   ├── category/        # Componentes relacionados con categorías
│   ├── context/         # Contextos de React (ej. Toast)
│   ├── layout/          # Componentes de layout
│   ├── orders/          # Componentes para pedidos
│   ├── products/        # Componentes para productos
│   ├── restaurant-map/  # Componentes para el mapa del restaurante
│   ├── sidebar/         # Componentes de la barra lateral
│   ├── tables/          # Componentes para mesas
│   └── users/           # Componentes para usuarios
├── pages/               # Páginas principales de la aplicación
│   ├── CategoriesPage.tsx
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   ├── OrdersPage.tsx
│   ├── ProductFormPage.tsx
│   ├── ProductsPage.tsx
│   ├── RestaurantMapPage.tsx
│   ├── TablesPage.tsx
│   └── UsersPage.tsx
├── services/            # Servicios para llamadas a la API
│   ├── CategoryService.ts
│   └── productService.ts
├── types/               # Definiciones de tipos TypeScript
│   ├── category.ts
│   └── products.ts
├── App.css              # Estilos específicos de App
├── App.tsx              # Componente principal de la aplicación
├── index.css            # Estilos globales
└── main.tsx             # Punto de entrada de la aplicación
```

## Páginas

### HomePage
Página de inicio del dashboard. Actualmente muestra un título simple y unos botones para navegar rapidamente al menu

### ProductsPage
Página para gestionar productos:
- Lista todos los productos con posibilidad de búsqueda por nombre
- Filtro por categoría
- Muestra información básica de cada producto (nombre, descripción, precio).
- Acciones disponibles: ver, editar, eliminar (botones preparados pero funcionalidad pendiente).

### ProductFormPage
Formulario para crear o editar productos. Accesible desde `/products/new` para nuevos productos y `/products/:id/edit` para editar existentes.
Muestra la informacion y la lista de categorias pero aun no se puede modificar realmente.

### CategoriesPage
Página para gestionar categorías de productos.

### UsersPage
Página para gestionar usuarios del sistema.

### TablesPage
Página para gestionar mesas del restaurante. (proximamente)

### RestaurantMapPage
Vista de mapa del restaurante para visualizar la disposición de mesas. (proximamente)

### OrdersPage
Página para gestionar pedidos. (proximamente)

### NotFoundPage
Página 404 para rutas no encontradas.

## Componentes Principales

### Sidebar
Barra lateral colapsable con navegación principal. Incluye:
- **SidebarHeader**: Cabecera con logo o título.
- **SidebarNav**: Navegación con enlaces a las diferentes secciones.
- **SidebarFooter**: Pie con opciones adicionales y botón de colapso.

### ProductItem
Componente para mostrar un producto individual en la lista, con imagen, información y acciones.

### ProductSkeleton
Componente de carga (skeleton) para la lista de productos. Una forma de mostrar feedback al usuario de que aun se estan cargando los datos.

### ToastContainer y ToastContext
Sistema de notificaciones toast para mostrar mensajes al usuario. Un ejemplo es al crear un nuevo producto o editarlo, poder mostrar que se ha realizado correctamente la accion.

## Servicios y API

La aplicación se conecta a una API REST desarrollada en Laravel corriendo en `http://localhost:8080`.

### ProductService
- `getProducts(params?)`: Obtiene la lista de productos con filtros opcionales (búsqueda, categoría).

### CategoryService
- `getCategories()`: Obtiene la lista de categorías.

Los servicios manejan errores y devuelven datos tipados según las interfaces definidas.

## Routing

Se utiliza React Router DOM con `BrowserRouter`. Las rutas principales son:

- `/`: HomePage
- `/products`: Lista de productos
- `/products/new`: Nuevo producto
- `/products/:id/edit`: Editar producto
- `/categories`: Categorías
- `/users`: Usuarios
- `/tables`: Mesas
- `/tables-map`: Mapa de mesas
- `/orders`: Pedidos
- `*`: NotFoundPage (404)

## Estilos

### TailwindCSS
- Configurado con Vite plugin.
- Tema oscuro con colores zinc (gris oscuro).
- Clases utilitarias para layout, colores y espaciado.
- Importado en `index.css` con `@import "tailwindcss";`.

### Configuración
- `tailwind.config.js`: Configuración básica con contenido de archivos `.js`, `.jsx`, `.ts`, `.tsx`, `index.html`.
- Tema extendido disponible para personalizaciones.

## Iconos

Se utiliza **Lucide React** para los iconos. Ejemplos de uso:
```tsx
import { HomeIcon, Eye, Pencil, Trash2 } from "lucide-react";

<HomeIcon className="w-5 h-5 text-accent" />
<Eye size={16} />
```

Iconos utilizados en la navegación y acciones de componentes.

## Notas Adicionales

- El proyecto está configurado para desarrollo con hot reload.
- La API backend debe estar corriendo en `http://localhost:8080` para que funcionen las llamadas.
- Algunos componentes tienen funcionalidad preparada pero no implementada completamente (ej. acciones de editar/eliminar productos).
- El diseño sigue un tema oscuro con TailwindCSS.
- TypeScript asegura tipado en componentes, servicios y tipos de datos.
