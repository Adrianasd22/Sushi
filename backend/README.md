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
