# 🍣 Sushi Miyu — Frontend Angular

Parte del frontend hecha con angular. Contiene multiples paginas webs html, hojas de estilos scss y codigo para angular en ts

---

## 🗂️ Estructura del proyecto

La estructura es la siguiente:

```
src/app/
│
├── app.ts                  # Componente raíz
├── app.html                # Template raíz
├── app.routes.ts           # Definición de rutas
├── app.config.ts           # Configuración global (HttpClient, Router, etc.)
│
├── pages/                  # Páginas completas (una por ruta)
│   ├── home-page/          # Página de inicio 
│   ├── menu-page/          # Página del menú (carga productos desde API (todavia no :( ))
│   ├── login-page/         # Formulario de inicio de sesión
│   ├── register-page/      # Formulario de registro
│   └── error404-page/      # Página de error para rutas no encontradas
│
├── components/             # Componentes reutilizables
│   ├── shared/
│   │   ├── header/         # Barra de navegación superior (logo, idioma)
│   │   │   └── sidenavbar/ # Menú lateral deslizable (abierto desde el header)
│   │   └── logo/           # Componente del logotipo SVG de Miyu
│   ├── product-card/       # Tarjeta visual de un producto (nombre, precio, imagen)
│   └── category-section/   # Sección agrupadora: título de categoría + lista de product-cards
│
├── services/
│   ├── product.service.ts  # Llama a la API REST y almacena los productos en una Signal
│   └── menu.service.ts     # Controla si el menú lateral (sidenavbar) está abierto o cerrado
│
├── interfaces/
│   ├── product.interface.ts    # Modelo de datos: Product { id, name, description, price, category, image }
│   ├── category.interface.ts   # Modelo de datos: Category { id, name }
│   └── allergen.interface.ts   # Modelo de datos: Allergen { id, name, code } (preparado para uso futuro)
│
└── images/                 # Imágenes estáticas del sitio (portada, interior, ramen, etc.)
```

---

## 🧭 Rutas de la aplicación

| Ruta         | Componente         | Descripción                            |
|--------------|--------------------|----------------------------------------|
| `/`          | `HomePage`         | Página de bienvenida con hero visual   |
| `/home`      | `HomePage`         | Alias de la ruta raíz                  |
| `/menu`      | `MenuPage`         | Listado de productos desde la API      |
| `/login`     | `LoginPage`        | Formulario de login                    |
| `/register`  | `RegisterPage`     | Formulario de registro                 |
| `/**`        | `Error404Page`     | Ruta comodín para páginas no encontradas |

---

## ⚙️ Arquitectura y flujo de datos

```
Usuario visita /menu
        │
        ▼
   MenuPage (página)
        │  al iniciar, llama a:
        ▼
  ProductService.loadProducts()
        │  hace GET a:
        ▼
  http://localhost:8080/api/products
        │  respuesta: { data: Product[] }
        │  mapea la imagen → http://localhost:8080/storage/<imagen>
        ▼
  products (Signal<Product[]>)  ←  estado reactivo global
        │
        ▼
  CategorySection (por cada producto)
        │
        ▼
  ProductCard (tarjeta visual individual)
```

El header y el sidenavbar son independientes de las páginas y se renderizan en `app.ts` de forma persistente en toda la aplicación.

---

## 🔌 Dependencias con el backend

El frontend espera un backend corriendo en `http://localhost:8080` con los siguientes endpoints:

| Endpoint                        | Método | Descripción                          |
|---------------------------------|--------|--------------------------------------|
| `/api/products`                 | GET    | Devuelve `{ data: Product[] }`       |
| `/storage/<nombre-de-imagen>`   | GET    | Sirve las imágenes de los productos  |

> ⚠️ Sin el backend activo, la página `/menu` no mostrará productos (el resto de páginas son estáticas).

---

## 🚀 Cómo arrancar el proyecto

### Requisitos previos

- [Angular CLI](https://angular.io/cli) instalado globalmente:

```bash
npm install -g @angular/cli
```

### Pasos



1. **Instala las dependencias:**

```bash
npm install
```

2. **Arranca el servidor de desarrollo:**

```bash
npm start
```

Esto ejecuta `ng serve`. La aplicación estará disponible en:

```
http://localhost:4200
```

> El servidor casi siempre se recarga automáticamente cuando editas cualquier archivo fuente.

### Scripts disponibles

| Comando         | Descripción                                 |
|-----------------|---------------------------------------------|
| `npm start`     | Arranca el servidor de desarrollo           |
| `npm run build` | Compila el proyecto para producción         |
| `npm test`      | Ejecuta los tests unitarios con Karma       |

---

## 🏗️ Estado actual del proyecto

El proyecto está en desarrollo. Algunas funcionalidades están preparadas pero pendientes de implementación:

- **Login y Registro**: los formularios recogen los datos pero el `AuthService` todavía no existe. El `TODO` en el código indica que está a la espera del backend.
- **Alérgenos**: la interfaz `Allergen` está definida con todos los códigos (GLUTEN, LACTEOS, PESCADO…), pero no se usa aún en `Product`.
- **Filtrado del menú**: existe código comentado en `MenuPage` para filtrar por nombre y agrupar por categoría. Está preparado pero desactivado.
- **Selector de idioma**: el header tiene lógica para cambiar entre idiomas (ES, EN…), pero no está conectado a un sistema de traducción  (se podria usar la libreria i18n de angular para traducir sin tener que cambiar el codigo fuente).

---

## 🛠️ Tecnologías utilizadas

- **Angular 17+** con componentes standalone
- **Angular Signals** para gestión de estado reactivo
- **RxJS** para llamadas HTTP
- **SCSS** para los estilos
- **Angular Router** con carga lazy en la página 404
