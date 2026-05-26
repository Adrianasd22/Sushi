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
¿Qué es Laravel Breeze?
Breeze es el starter kit oficial de autenticación de Laravel. Cuando lo instalas en modo "Blade", te genera automáticamente:
Lo que Breeze te da:

- Rutas de login, registro, recuperación de contraseña, verificación de email

- Controladores de autenticación ya hechos

- Un layout base (app.blade.php) con navegación responsiva

- Componentes Blade reutilizables en resources/views/components/

- Integración con Tailwind CSS

Los componentes clave que debes conocer:
Componente->Lo que hace

<x-app-layout>El layout principal con navbar y sidebar ya incluidos

<x-guest-layout>Layout para páginas sin autenticación (login, registro)

<x-nav-link> Links de navegación con estado activo automático

<x-primary-button> Botón estilizado principal

<x-input-error> Muestra errores de validación

<x-slot:header> Slot para poner el título de cada página

La estructura que genera Breeze:
resources/
  views/
    layouts/
      app.blade.php        ← Layout principal
      navigation.blade.php ← La navbar
    components/
      primary-button.blade.php
      nav-link.blade.php
      ...
    dashboard.blade.php    ← Ejemplo de página

```
composer require laravel/breeze --dev
php artisan breeze:install
```
