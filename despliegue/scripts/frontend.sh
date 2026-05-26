#!/bin/bash
exec > /tmp/userdata_frontend.log 2>&1

# Actualizar sistema
apt update -y
apt upgrade -y

# Instalar Apache
apt install -y apache2 git unzip curl
systemctl enable apache2
systemctl start apache2

#Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs


# Clonar proyecto
cd /home/ubuntu
git clone https://github.com/Adrianasd22/sushi.git
cd sushi


# Build angular
cd /home/ubuntu/sushi/frontend/public-angular/front-angular
npm install
npx ng build --configuration production

# Build React
cd /home/ubuntu/sushi/frontend/front-react
npm install
npx run build

# Limpiar carpeta web
rm -rf /var/www/html/*

# Copiar builds ya generados
# Angular
mkdir -p /var/www/html/
cp -r /home/ubuntu/sushi/frontend/public-angular/front-angular/dist/*/* /var/www/html/


# React
mkdir -p /var/www/html/admin
cp -r /home/ubuntu/sushi/frontend/front-react/dist/* /var/www/html/admin/

# Reiniciar Apache
systemctl restart apache2