#!/bin/bash
exec > /tmp/userdata_backend.log 2>&1

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
docker compose down || true
docker compose up -d --build

# Laravel setup
sleep 15
docker exec laravel_app php artisan key:generate || true
docker exec laravel_app php artisan migrate --force || true