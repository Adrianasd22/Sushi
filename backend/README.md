# Backend Laravel - Sushi

Este proyecto es el backend Laravel del restaurante Sushi. Expone una API REST para productos, categorías, pedidos y usuarios, y ofrece vistas administrativas con Laravel Breeze.

## Tecnologías utilizadas

- **Laravel 12**
- **PHP 8.3**
- **MySQL**
- **Laravel Sanctum**
- **Laravel Breeze**
- **TailwindCSS**
- **Vite**
- **Docker**

## Índice

- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Documentación Swagger](#documentación-swagger)
- [Instalación local](#instalación-local)
- [Breeze, blades y CRUD](#breeze-blades-y-crud)
- [Seguridad, roles y middleware](#seguridad-roles-y-middleware)
- [Imágenes y storage](#imágenes-y-storage)
- [Resumen](#resumen)

## Estructura del proyecto

- `src/routes/api.php`: rutas de la API REST.
- `src/routes/web.php`: rutas web administrativas protegidas.
- `src/app/Http/Controllers/Api`: controladores de API.
- `src/resources/views`: Blade views para dashboard, productos, categorías, auth y perfil.
- `src/public/swagger`: Swagger UI integrado para documentación.
- `src/storage/app/public`: almacenamiento de imágenes y archivos públicos.
- `docker-compose.yml` / `Dockerfile`: soporte de contenedores para desarrollo.

## Documentación Swagger

La documentación completa de la API se consulta en Swagger:

- UI Swagger: `http://localhost:8080/swagger`

La API cubre varias entidades como productos, categorías, pedidos y usuarios; la lista completa de endpoints y sus detalles está en Swagger.

## Instalación local

Esta infraestructura está diseñada para desplegarse en AWS, pero en local puedes usar Docker para desarrollo.

1. Desde la carpeta `backend`:
   ```bash
   docker-compose up -d
   ```
2. Si necesitas ejecutar comandos dentro del contenedor:
   ```bash
   docker-compose exec laravel bash
   ```
3. Dentro del contenedor, ejecuta migraciones y storage link:
   ```bash
   php artisan migrate --seed
   php artisan storage:link
   ```

Si no usas Docker, instala dependencias con Composer, copia `.env.example` a `.env`, genera `APP_KEY` y configura la base de datos.

## Breeze, blades y CRUD

El backend incluye vistas Blade para el dashboard administrativo. Laravel Breeze gestiona:

- login, registro y sesión de usuario.
- CRUD de productos y categorías desde el panel.
- plantillas de auth y layouts base.

Las vistas administrativas se protegen con sesiones y middleware de rol.

## Seguridad, roles y middleware

La API usa Laravel Sanctum para autenticación por tokens.

- `auth:sanctum` protege los endpoints que requieren usuario autenticado.
- Hay roles definidos: `admin`, `worker` y `user`.
- El middleware de roles limita el acceso a funciones administrativas (CRUD de productos, categorías y usuarios).

## Imágenes y storage

Las imágenes subidas se guardan en `src/storage/app/public`.

- Se accede desde la web mediante `public/storage` tras crear el enlace con `php artisan storage:link`.
- El storage está preparado para migrar a una solución de archivos en AWS más adelante.

## Resumen

Este backend provee:

- una API REST protegida con Sanctum,
- documentación Swagger accesible desde `http://localhost:8080/swagger`,
- vistas Blade administradas con Breeze,
- almacenamiento de imágenes vía `storage`.

Para la lista completa de rutas y modelos, usa la documentación Swagger en la URL indicada.

# Checklist para iniciar el AWS 

Como esta en el aws acadamy hay que preparar varias cosas antes de iniciarlo todo porque si no dará problemas (no preocuparse tanto por el github actions)

## IP de las instancias

Con esto nada porque estan como ip elasticas, asi que no deberia dar problema, de todas formas si las da al hacer

```bash
terraform apply
```

Cuando termine los output son las ip del frontend, backend y la url del bucket S3

>EC2_HOST -> IP del frontend
>EC2_BACKEND_HOST -> IP del backend

## Actualizar credenciales

Al iniciar el laboratorio (que dura 4 horas), ir a la parte de AWS Details -> AWS CLI (show) y copiar en el /.aws/config
Ademas de cambiarlos en los secrets de actions:

>AWS_ACCESS_KEY_ID -> aws_access_key_id
>AWS_SECRET_ACCESS_KEY -> aws_secret_access_key
>AWS_SESSION_TOKEN -> aws_session_token (copiar entero)

## Actualizar IP del backend

Igual que con lo de las IP de las instancias, como es elastica no deberia de haber que cambiarla.
Por si acaso cambiara, ir al .env del backend (ec2 del backend -> /home/ubuntu/sushi/backend/src/.env) y cambiar:

``` bash
APP_URL=http://ip_backend:8080
```

## Actualizar la IP del backend en el frontend

Más de lo mismo.
Ir a los archivos donde este la IP del backend en el front:

#### REACT: /home/ubuntu/sushi/frontend/front-react/src/config/env.ts
#### Angular: /home/ubuntu/sushi/frontend/public-angular/front-angular/src/environments/environment.ts

## Aplicar las instancias si no existen
```bash
terraform apply
```
> Esto se hace desde la carpeta en la que esta el main.tf