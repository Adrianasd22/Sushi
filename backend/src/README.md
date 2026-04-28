## Tablas necesarias (completadas 100%):
- Producto:
    - ✅ Product (Model)
    - ✅ ProductController
    - ✅ ProductResource
    - ✅ products_table (Migrations)
    - ✅ ProductSeeder

- Pedido: 

- Usuario:
    - ✅ User (Model) <-- por defecto
    - ✅ Users_table (Migrations) <-- Por defecto

- Categoria:
    - ✅ Category (Model)
    - ✅ Categories_table (Migrations)
    - ✅ CategorySeeder
- Mesa:

- Alergenos: 

- Reseña:



## Blades
- ✅ ~~Tarea ya hecha~~
- Tarea pendiente

## Routes:
- ✅ api.php (API) -->index
- ✅ web.php --> products.index


## Chuleta:
MODELO + MIGRACIÓN: 
database/migrations/xxxx_create_cursos_table.php 
|
app/Models/Curso.php
```
php artisan make:model Curso -m
```

EJECUTA MIGRACIÓN:
```
php artisan migrate
```
---
SEEDERS:
database/seeders/
```

php artisan make:seeder CursoSeeder
```
EJECUTA LOS SEEDERS:
```
php artisan db:seed
```
---
CONTROLER:

app/Http/Controllers/CursoController.php
```
php artisan make:controller CursoController
```
---

BLADES:

resources/views/

---

TINKER:
```
XDG_CONFIG_HOME=/tmp php artisan tinker
```
# IMAGENES:
Las imagenes que se usaran para los platos principalmente estan en 

```
Sushi\backend\src\storage\app\public\products\gyozas.png
```

## BREEZE:
Breeze es un generador de autentificacion automatica.

Te crea automáticamente:

🔐 Backend
- Controlador de login
- Controlador de registro
- Validaciones
- Logout
- Rutas de auth
🎨 Frontend (opcional)
- Vistas Blade (login, register, etc.)


```
composer require laravel/breeze --dev
php artisan breeze:install
```
