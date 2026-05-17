#!/bin/bash
exec > /tmp/userdata_frontend.log 2>&1

# Actualizar sistema
apt update -y
apt upgrade -y

# Instalar Apache
apt install -y apache2 git unzip curl

systemctl enable apache2
systemctl start apache2

# Limpiar carpeta web
rm -rf /var/www/html/*

# Clonar proyecto
cd /home/ubuntu
git clone https://github.com/Adrianasd22/sushi.git
cd sushi

# Copiar builds ya generados
# Angular
mkdir -p /var/www/html/
cp -r frontend/public-angular/dist/* /var/www/html/

# React
mkdir -p /var/www/html/admin
cp -r frontend/front-react/dist/* /var/www/html/admin/

# Reiniciar Apache
systemctl restart apache2