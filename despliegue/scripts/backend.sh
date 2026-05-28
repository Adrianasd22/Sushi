#!/bin/bash
exec > /tmp/userdata_backend.log 2>&1

# SWAP (evita quedarse sin memoria durante el build, convirtiendo memoria en memoria RAM)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile


# Sistema
apt update -y
apt upgrade -y

# Docker
apt install -y docker.io docker-compose git

systemctl enable docker
systemctl start docker

# Proyecto
cd /home/ubuntu
git clone https://github.com/Adrianasd22/sushi.git
cd sushi/backend

# Crear .env si no existe
if [ ! -f .env ]; then
    cp .env.example .env || true
fi

# Levantar servicios
sudo docker-compose down || true
sudo docker-compose up -d --build

# Laravel setup

# Esperar a que Laravel arranque completamente
echo "Esperando a que los contenedores arranquen..."
sleep 60

sudo docker exec laravel12_app php artisan key:generate || true
docker exec laravel12_app php artisan migrate --force || true
docker exec laravel12_app php artisan db:seed --force || true  #Seeders
