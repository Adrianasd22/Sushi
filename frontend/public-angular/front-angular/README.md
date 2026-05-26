# 🍣 Sushi Miyu — Frontend Angular

Este proyecto es el frontend Angular del restaurante Sushi. Es la parte pública y de cliente que consume la API del backend y ofrece login, registro, menú, pedido y estado del carrito.

## Índice

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Funcionalidades principales](#funcionalidades-principales)
- [Servicios y componentes](#servicios-y-componentes)
- [Estado actual](#estado-actual)
- [Tests y GitHub Actions](#tests-y-github-actions)

## Descripción

Este frontend Angular es el cliente web del restaurante Sushi Miyu. Permite iniciar sesión, registrarse, ver el menú, crear pedidos y acceder a la experiencia pública.

## Tecnologías utilizadas

- **Angular 20+**
- **TypeScript**
- **Angular Router**
- **RxJS**
- **SCSS**
- **Lucide Angular** para iconos
- **Karma / Jasmine** para tests

## Estructura del proyecto

```
src/app/
├── app.ts
├── app.html
├── app.routes.ts
├── app.config.ts
├── components/
│   ├── shared/
│   │   ├── header/
│   │   └── sidenavbar/
│   ├── product-card/
│   └── category-section/
├── pages/
│   ├── home-page/
│   ├── menu-page/
│   ├── login-page/
│   ├── register-page/
│   ├── order-page/
│   └── error404-page/
├── services/
│   ├── index-db.service.ts
│   ├── login.service.ts
│   ├── menu.service.ts
│   ├── order.service.ts
│   └── product.service.ts
├── interfaces/
│   ├── product.interface.ts
│   ├── category.interface.ts
│   ├── order.interface.ts
│   └── allergen.interface.ts
└── images/
```

## Rutas de la aplicación

- `/` — HomePage
- `/home` — alias de HomePage
- `/menu` — MenuPage con productos
- `/login` — LoginPage
- `/register` — RegisterPage
- `/order` — OrderPage para enviar el pedido
- `/**` — Error404Page

## Funcionalidades principales

- Login y registro funcionando contra el backend.
- Autenticación: token y rol se guardan en `localStorage`.
- Si el usuario es `admin`, el login redirige al dashboard externo.
- Productos y categorías se cargan desde la API y se guardan en IndexedDB para cache local.
- El carrito/pedido se mantiene en IndexedDB mientras se prepara.
- El envío del pedido usa el token de `localStorage` para autorizar la petición a `/api/orders`.

## Servicios y componentes

- **ProductService**: maneja productos, categorías y cache en IndexedDB.
- **OrderService**: gestiona el carrito, añade, elimina, limpia y persiste el pedido en IndexedDB.
- **LoginService**: ejecuta login contra el backend y guarda token/rol en `localStorage`.
- **IndexedDbService**: abstracción de la base de datos local para productos, categorías y pedidos.
- **MenuService**: controla el estado del menú lateral.

Páginas clave:

- **HomePage**: bienvenida y navegación.
- **MenuPage**: muestra productos y permite agregar al pedido.
- **LoginPage**: formulario de acceso y redirección según rol.
- **RegisterPage**: formulario de registro.
- **OrderPage**: formulario de envío de pedido con validación.
- **Error404Page**: ruta comodín.

Componentes principales:

- **Header**: barra superior y navegación.
- **Sidenavbar**: menú lateral.
- **ProductCard**: tarjeta visual de producto.
- **CategorySection**: sección agrupada por categoría.

## Estado actual

- El frontend está operativo con login y registro.
- El backend debe estar disponible en `http://localhost:8080`.
- El carrito y el pedido se mantienen en IndexedDB hasta su envío.
- El login guarda `auth_token` y `role` en `localStorage`.
- Si el usuario es `admin`, se redirige al dashboard externo configurado en `environment.dashboardUrl`.
- Las categorías y productos se cachean en IndexedDB para recargas posteriores.

## Tests y GitHub Actions

- Los tests se ejecutan con `npm test` usando **Karma / Jasmine**.
- Aunque no hay un workflow de GitHub Actions definido en este repositorio, la integración es directa: una acción puede ejecutar `npm install` y `npm test` en cada push.

## Cómo arrancar en local

1. En el directorio del proyecto:
   ```bash
   cd frontend/public-angular/front-angular
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Arranca la app:
   ```bash
   npm start
   ```

La aplicación queda disponible en `http://localhost:4200`.
