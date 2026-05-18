# Frontend React - Dashboard de Sushi

Este proyecto es el dashboard administrativo en React de Sushi Miyu. Esta parte es la interfaz privada para la gestión interna del restaurante: productos, categorías, pedidos, usuarios y el mapa de mesas.

## Índice

- [Descripción](#descripción)
- [Protección y roles](#protección-y-roles)
- [Tecnologías y herramientas](#tecnologías-y-herramientas)
- [Instalación local](#instalación-local)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Páginas y componentes principales](#páginas-y-componentes-principales)
- [Rutas principales](#rutas-principales)

## Descripción

Esta es la parte de dashboard de administración del sistema que consume la API Laravel del backend, permitiendote realizar cambios en la base de datos de una forma más fácil.

## Protección y roles

El dashboard está protegido y solo pueden acceder usuarios con roles `admin` o `worker`.

Los usuarios `worker` pueden usar funciones básicas del dashboard.
Algunas vistas y acciones solo están disponibles para `admin`.


## Tecnologías y herramientas

- **React 19** con **TypeScript**.
- **Vite** como bundler rápido.
- **TailwindCSS** para estilos utilitarios.
- **Lucide React** para iconos.
- **React Router DOM** para navegación.
- **ESLint** para calidad de código.

## Instalación local

Para ejecutar el dashboard localmente:

1. Navega al directorio:
   ```bash
   cd frontend/front-react
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app:
   ```bash
   npm run dev
   ```

La aplicación se sirve en `http://localhost:5173` por defecto.

## Estructura del proyecto

```
src/
├── components/
│   ├── buttons/
│   ├── category/
│   ├── context/
│   ├── layout/
│   ├── orders/
│   ├── products/
│   ├── restaurant-map/
│   ├── sidebar/
│   ├── tables/
│   └── users/
├── pages/
│   ├── CategoriesPage.tsx
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   ├── OrdersPage.tsx
│   ├── ProductFormPage.tsx
│   ├── ProductsPage.tsx
│   ├── RestaurantMapPage.tsx
│   ├── TablesPage.tsx
│   └── UsersPage.tsx
├── services/
│   ├── CategoryService.ts
│   └── productService.ts
├── types/
│   ├── category.ts
│   └── products.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Páginas y componentes principales

- **HomePage**: punto de entrada del dashboard con navegación principal.
- **ProductsPage**: lista y filtros de productos.
- **ProductFormPage**: formulario para crear o editar productos.
- **CategoriesPage**: gestión de categorías.
- **UsersPage**: gestión de usuarios.
- **TablesPage**: gestión de mesas.
- **RestaurantMapPage**: mapa del restaurante.
- **OrdersPage**: gestión de pedidos.
- **NotFoundPage**: vista 404.

Servicios y utilidades:

- **ProductService**: llamadas API para productos.
- **CategoryService**: llamadas API para categorías.
- **ToastContext**: notificaciones de usuario.
- **Sidebar**: navegación lateral con enlaces y permisos.

## Rutas principales

- `/` — Home del dashboard
- `/products` — listado de productos
- `/products/new` — crear producto
- `/products/:id/edit` — editar producto
- `/categories` — categorías
- `/users` — usuarios
- `/tables` — mesas
- `/tables-map` — mapa de mesas
- `/orders` — pedidos
- `*` — página 404

## Resumen

El frontend React es el dashboard interno del sistema. Está protegido para `admin` y `worker`, y muestra opciones administrativas según el rol. Usa Tailwind para diseño y Lucide para iconos.
