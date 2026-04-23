# Indice: 
- Tablas y que hay hecho
- Rutas/endpoints
- Blades
- Chuleta (comandos de laravel)
- Laravel Storage (que es y como funciona)


---
## Tablas necesarias (completadas 100%):
- Producto:
    - ✅ Product (Model)
    - ✅ ProductController
        - index() -> blade
        - create() 
        - store()
        - edit ()
        - update()
        - destroy()
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

---
## Routes:

---
## Endpoints:

- ``api.php (API)``
    - GET: (index)
        - ✅ products
        - ✅ products/{id}
        - ✅ products?category_id={id}
        - ✅ products?search={name}
        - ✅ products?category_id={id}&search={name}

    - POST:
    - PUT:
    - DELETE:

- ``web.php`` --> products.index

---
## Blades
- ✅ index
- Tarea pendiente



---
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



## LARAVEL STORAGE:
Es una forma que tiene Laravel para almacenar archivos. En este caso mi intencion es almacenar todas las imagenes de los productos que se van a ver en la pagina. 

Laravel Storage nos permite almacenar en 3 localizaciones: 

`local` --> storage/app --> Fácil, desarrollo
`public` -->	storage/app/public accesible vía public/storage --> Imágenes accesibles desde web
`s3` -->	AWS S3 -->	Producción, escalable

En este caso usare public que permite hacerlo con localhost.

Para usarlo hay que crear un enlace simbolico: `php artisan storage:link` que hara que: "INFO  The [public/storage] link has been connected to [storage/app/public]".

Significa que cualquier archivo que guardes en storage/app/public se puede acceder en el navegador usando: `http://localhost:8000/storage/archivo.jpg`


Las imagenes estan dentro de `storage/app/public/products`
