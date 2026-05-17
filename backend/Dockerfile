FROM php:8.3-apache

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
 && docker-php-ext-install pdo_mysql zip mbstring gd xml \
 && a2enmod rewrite \
 && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar código
COPY ./src /var/www/html

# Permisos correctos
RUN chown -R www-data:www-data /var/www/html

# Instalar dependencias Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || true

# Apache apunta a public
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80