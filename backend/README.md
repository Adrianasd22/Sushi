# Backend Laravel - API REST de Sushi

Este proyecto es el backend desarrollado en Laravel para el sistema de restaurante Sushi. Proporciona una API REST completa para gestionar productos, categorías, pedidos, usuarios y autenticación. Forma parte de una aplicación más amplia que incluye dos frontends: uno en React para el dashboard administrativo y otro en Angular para la parte pública.

## Tecnologías Utilizadas

- **Laravel 12**: Framework PHP moderno para construcción rápida de APIs.
- **PHP 8.3**: Lenguaje de programación del servidor.
- **MySQL 8.0**: Base de datos relacional.
- **Laravel Sanctum**: Sistema de autenticación por tokens API.
- **Laravel Breeze**: Starter kit con autenticación prediseñada.
- **TailwindCSS**: Framework de CSS para estilos.
- **Vite**: Herramienta de construcción de assets.
- **Pest PHP**: Framework de testing.
- **Docker**: Containerización para desarrollo y producción.

## Instalación y Configuración

### Prerrequisitos

- Docker y Docker Compose instalados
- O alternativamente: PHP 8.3+, Composer, MySQL

### Instalación con Docker (Recomendado)

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Levanta los contenedores:
   ```bash
   docker-compose up -d
   ```

   Esto iniciará:
   - **Laravel**: `http://localhost:8080`
   - **MySQL**: `localhost:3307` (usuario: laravel, contraseña: secret)
   - **phpMyAdmin**: `http://localhost:8081`

3. Entra al contenedor de Laravel:
   ```bash
   docker-compose exec laravel bash
   ```

4. Ejecuta las migraciones y seeders:
   ```bash
   php artisan migrate --seed
   ```

5. Crea el enlace para almacenamiento de archivos:
   ```bash
   php artisan storage:link
   ```

### Instalación Local (Sin Docker)

1. Instala las dependencias:
   ```bash
   composer install
   npm install
   ```

2. Configura el archivo `.env`:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. Configura la conexión a base de datos en `.env` y ejecuta migraciones:
   ```bash
   php artisan migrate --seed
   php artisan storage:link
   ```

4. Inicia los servidores:
   ```bash
   php artisan serve
   npm run dev
   ```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/                 # Controllers para API REST
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   ├── ProductController.php
│   │   │   │   │   ├── CategoryController.php
│   │   │   │   │   ├── OrderController.php
│   │   │   │   │   └── UserController.php
│   │   │   │   ├── Auth/                # Controllers de autenticación Breeze
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   └── ProfileController.php
│   │   │   ├── Requests/                # Form Requests para validación
│   │   │   └── Resources/               # API Resources para respuestas
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Product.php
│   │   │   ├── Category.php
│   │   │   └── Order.php
│   │   ├── Providers/
│   │   └── View/
│   ├── database/
│   │   ├── migrations/                  # Migraciones de base de datos
│   │   │   ├── create_users_table.php
│   │   │   ├── create_categories_table.php
│   │   │   ├── create_products_table.php
│   │   │   ├── create_orders_table.php
│   │   │   └── create_order_product_table.php
│   │   └── seeders/                     # Seeders para poblar datos
│   │       ├── UserSeeder.php
│   │       ├── CategorySeeder.php
│   │       ├── ProductSeeder.php
│   │       └── DatabaseSeeder.php
│   ├── resources/
│   │   ├── views/                       # Blades (templates)
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── auth/
│   │   │   ├── dashboard.blade.php
│   │   │   └── layouts/
│   │   ├── css/
│   │   └── js/
│   ├── routes/
│   │   ├── api.php                      # Rutas de API REST
│   │   ├── web.php                      # Rutas web (Breeze)
│   │   └── auth.php                     # Rutas de autenticación
│   ├── storage/
│   │   └── app/public/products/         # Almacenamiento de imágenes
│   └── config/                          # Archivos de configuración
├── Dockerfile                            # Configuración de container
├── docker-compose.yml                    # Orquestación de servicios
└── README.md                             # Este archivo
```

## API REST - Endpoints

## Documentación Swagger

La documentación Swagger/OpenAPI del proyecto está actualmente ubicada en la carpeta `docs/` del repositorio como archivos estáticos.

- Archivo OpenAPI: `docs/swagger.yaml`
- Interfaz Swagger UI: `docs/Swagger/index.html`

### Cómo comprobarla

1. Abre `docs/Swagger/index.html` en tu navegador.
2. Asegúrate de que el archivo `docs/swagger.yaml` está en la carpeta `docs/`.

Si prefieres usar un servidor local, puedes servir la carpeta `docs` con un servidor estático. Por ejemplo:

```bash
cd docs
python -m http.server 8000
```

Luego abre en el navegador:

```
http://localhost:8000/Swagger/index.html
```

### Nota importante

Actualmente, no existe un endpoint en el backend Laravel para acceder a la documentación Swagger (como `/api/docs`). La documentación se mantiene como archivos estáticos en la carpeta `docs/`.

### Plan futuro

Se planea integrar la documentación Swagger como un endpoint accesible desde el backend Laravel en futuras versiones del proyecto.

### Autenticación (Pública)

#### POST `/api/register`
Registra un nuevo usuario (rol por defecto: `user`).

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "mensaje": "Usuario registrado exitosamente. Por favor inicia sesión.",
  "user": { "id": 1, "name": "Juan Pérez", "email": "juan@example.com", "role": "user" },
  "role": "user"
}
```

#### POST `/api/login`
Inicia sesión y devuelve un token de autenticación.

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "mensaje": "Hola Juan Pérez",
  "access_token": "1|AbCdEf...",
  "token_type": "Bearer",
  "user": { "id": 1, "name": "Juan Pérez", "email": "juan@example.com", "role": "user" }
}
```

### Productos (Parcialmente Pública)

#### GET `/api/products`
Lista todos los productos con filtros opcionales.

**Parámetros (query):**
- `search`: Buscar por nombre (LIKE)
- `category_id`: Filtrar por categoría (ID)
- `sort`: Campo para ordenar
- `order`: Dirección de orden (asc/desc)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Gyozas",
      "description": "Gyozas de camarón",
      "price": 8.50,
      "category_id": 1,
      "image": null,
      "category": { "id": 1, "name": "Entrantes" }
    }
  ]
}
```

#### GET `/api/products/{id}`
Obtiene un producto específico por ID.

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Gyozas",
    "description": "Gyozas de camarón",
    "price": 8.50,
    "category_id": 1,
    "image": null,
    "category": { "id": 1, "name": "Entrantes" }
  }
}
```

#### POST `/api/products` (Admin Only)
Crea un nuevo producto.

**Request:**
```json
{
  "name": "Nuevo Plato",
  "description": "Descripción del plato",
  "price": 12.99,
  "category_id": 1
}
```

**Response:** 201 Created

#### PUT `/api/products/{id}` (Admin Only)
Actualiza un producto existente.

**Request:** (campos opcionales)
```json
{
  "name": "Nombre actualizado",
  "price": 13.99
}
```

#### DELETE `/api/products/{id}` (Admin Only)
Elimina un producto.

**Response:** 200 OK

### Categorías (Parcialmente Pública)

#### GET `/api/categories`
Lista todas las categorías.

**Parámetros:**
- `search`: Buscar por nombre
- `sort`: Campo para ordenar

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Entrantes"
    },
    {
      "id": 2,
      "name": "Platos Principales"
    }
  ]
}
```

#### GET `/api/categories/{id}`
Obtiene una categoría específica.

#### GET `/api/categories-with-products`
Obtiene categorías con sus productos asociados (Admin Only).

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Entrantes",
      "products": [ { "id": 1, "name": "Gyozas", ... } ]
    }
  ]
}
```

#### POST `/api/categories` (Admin Only)
Crea una nueva categoría.

**Request:**
```json
{
  "name": "Nueva Categoría"
}
```

#### PUT `/api/categories/{id}` (Admin Only)
Actualiza una categoría.

#### DELETE `/api/categories/{id}` (Admin Only)
Elimina una categoría.

### Usuarios (Admin Only)

#### GET `/api/users`
Lista todos los usuarios del sistema.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Administrador",
      "email": "admin@example.com",
      "role": "admin",
      "created_at": "2026-02-24T12:00:00Z"
    }
  ]
}
```

#### GET `/api/users/{id}`
Obtiene los datos de un usuario específico.

#### POST `/api/users` (Admin Only)
Crea un nuevo usuario (con rol especificado).

**Request:**
```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "password123",
  "role": "worker"
}
```

#### PUT `/api/users/{id}/role` (Admin Only)
Cambia el rol de un usuario.

**Request:**
```json
{
  "role": "admin"
}
```

#### DELETE `/api/users/{id}` (Admin Only)
Elimina un usuario.

### Pedidos (Autenticado)

#### GET `/api/orders`
Lista todos los pedidos del usuario autenticado.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "total": 25.50,
      "notes": "Sin cebolla",
      "products": [
        {
          "id": 1,
          "name": "Gyozas",
          "quantity": 2,
          "unit_price": 8.50
        }
      ],
      "created_at": "2026-04-28T12:00:00Z"
    }
  ]
}
```

#### GET `/api/orders/{id}`
Obtiene los detalles de un pedido específico.

#### POST `/api/orders` (Autenticado)
Crea un nuevo pedido.

**Request:**
```json
{
  "products": [
    {
      "id": 1,
      "quantity": 2
    },
    {
      "id": 3,
      "quantity": 1
    }
  ]
}
```

**Response:** 201 Created

#### PUT `/api/orders/{id}` (Admin Only)
Actualiza un pedido (estado, notas, etc.).

#### DELETE `/api/orders/{id}` (Admin Only)
Elimina un pedido.

### Logout

#### POST `/api/logout` (Autenticado)
Cierra la sesión eliminando el token.

**Response:**
```json
{
  "mensaje": "Sesión cerrada correctamente"
}
```

## Modelos de Base de Datos

### User
```
id (PK)
name: string
email: string (unique)
password: string (hashed)
role: enum(admin, worker, user)
email_verified_at: timestamp (nullable)
created_at, updated_at: timestamps
```

### Category
```
id (PK)
name: string
created_at, updated_at: timestamps
```

### Product
```
id (PK)
name: string
description: string
price: decimal(8,2)
category_id (FK -> categories)
image: string (nullable) - Ruta en storage
created_at, updated_at: timestamps
```

### Order
```
id (PK)
user_id (FK -> users)
total: decimal(8,2)
notes: string (nullable)
created_at, updated_at: timestamps
```

### Order_Product (Tabla Pivote)
```
id (PK)
order_id (FK -> orders)
product_id (FK -> products)
quantity: integer
unit_price: decimal(8,2)
```

## Blades (Vistas)

Las siguientes vistas están disponibles (la mayoría proporcionadas por Laravel Breeze):

- `welcome.blade.php`: Página de bienvenida
- `dashboard.blade.php`: Dashboard principal (requiere autenticación)
- `products/index.blade.php`: Listado de productos con TailwindCSS
- `categories/index.blade.php`: Listado de categorías
- `auth/*`: Vistas de autenticación (login, register, etc.)
- `profile/*`: Vistas de perfil de usuario
- `layouts/app.blade.php`: Layout principal

Las rutas web están configuradas en `routes/web.php` y requieren autenticación con Breeze.

## Almacenamiento de Imágenes (Storage)

### Configuración

Laravel Storage permite guardar archivos de forma organizada. Para este proyecto se utiliza:

- **Ubicación**: `storage/app/public/products/`
- **Acceso público**: `http://localhost:8080/storage/products/imagen.png`

### Uso

Para crear el enlace simbólico (si no está creado):
```bash
php artisan storage:link
```

Esto vincula `storage/app/public` a `public/storage`, permitiendo acceso web a los archivos.

### Ejemplo: Guardar imagen de producto

```php
// En el controlador
$path = $request->file('image')->store('products', 'public');
// Resultado: products/nombre_del_archivo.png
```

### Rutas disponibles

- Las imágenes en `storage/app/public/products/` son accesibles en:
  - `http://localhost:8080/storage/products/nombre.png`

## Autenticación y Autorización

### Sanctum (API)

La API utiliza **Laravel Sanctum** para autenticación por tokens:

1. El usuario hace login en `/api/login`
2. Recibe un `access_token` en formato Bearer
3. En futuras peticiones, incluye el header: `Authorization: Bearer {token}`

### Roles

Existen tres roles en el sistema:

- **admin**: Acceso completo a CRUD de productos, categorías y usuarios
- **worker**: Acceso a visualizar datos (pendiente de implementación)
- **user**: Usuario regular (pedidos personales)

### Middleware

- `auth:sanctum`: Requiere autenticación
- `role:admin,worker`: Requiere uno de los roles especificados

## Comandos Laravel Útiles

```bash
# Migraciones y Seeders
php artisan migrate                    # Ejecutar migraciones
php artisan migrate:fresh --seed       # Resetear BD y popular datos
php artisan db:seed                    # Ejecutar seeders

# Modelos y Controladores
php artisan make:model NombreModelo -m                # Crear modelo con migración
php artisan make:controller Api/NombreController       # Crear controlador

# Storage
php artisan storage:link               # Crear enlace simbólico

# Desarrollo
php artisan serve                      # Servidor de desarrollo
php artisan tinker                     # Shell interactivo
php artisan routes:list                # Listar todas las rutas

# Testing
php artisan test                       # Ejecutar tests Pest
```

## Notas Importantes

- La API responde en JSON
- Todos los endpoints de POST, PUT, DELETE requieren validación
- Los errores devuelven códigos HTTP apropriados (404, 401, 403, 422, etc.)
- Las contraseñas se almacenan hasheadas con bcrypt
- La tabla de usuarios incluye un campo `role` por defecto en 'user'
- Las imágenes se guardan en storage, no en la base de datos
- Los seeders populan la BD con datos de prueba

## Docker

### Servicios disponibles

- **laravel** (PHP 8.3 + Apache): `http://localhost:8080`
- **db** (MySQL 8.0): `localhost:3307`
- **phpmyadmin**: `http://localhost:8081`

### Comandos útiles

```bash
# Levantar servicios
docker-compose up -d

# Entrar al contenedor de Laravel
docker-compose exec laravel bash

# Ver logs
docker-compose logs -f laravel

# Detener servicios
docker-compose down
```
