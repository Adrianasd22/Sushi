#!/bin/bash
exec > /tmp/userdata_backend.log 2>&1

# SWAP (evita quedarse sin memoria durante el build, convirtiendo memoria en memoria RAM)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile none swap sw 0 0" >> /etc/fstab


# Sistema
apt update -y
#apt upgrade -y


# Docker
apt install -y docker.io docker-compose git
systemctl enable docker
systemctl start docker


#Limpia lo que hubiese antes de hacer build
docker system prune -af || true
docker builder prune -af || true


# Proyecto
cd /home/ubuntu
rm -rf sushi || true
git clone https://github.com/Adrianasd22/sushi.git
cd sushi/backend

# Crear .env y configurarlo
cat > /home/ubuntu/sushi/backend/.env << 'ENVFILE'
APP_NAME=SushiMiyu
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=http://sushimiyu-api.duckdns.org:8080

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.duckdns.org

CACHE_STORE=database
QUEUE_CONNECTION=database

LOG_CHANNEL=stack
LOG_LEVEL=debug

FILESYSTEM_DISK=local

SANCTUM_STATEFUL_DOMAINS=sushimiyu.duckdns.org,sushimiyu-api.duckdns.org
ENVFILE

# Levantar servicios
sudo docker-compose down || true
sudo docker-compose up -d --build

# Esperar a que Laravel arranque completamente
echo "Esperando a que los contenedores arranquen..."
sleep 60

# Laravel setup
docker exec laravel12_app php artisan key:generate --force
docker exec laravel12_app php artisan config:clear
docker exec laravel12_app php artisan cache:clear

sleep 20

docker exec laravel12_app php artisan migrate --force || true
docker exec laravel12_app php artisan db:seed --force || true  #Seeders
docker exec laravel12_app php artisan config:cache
docker exec laravel12_app php artisan route:cache

echo "Backend desplegado correctamente"