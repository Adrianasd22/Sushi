#!/bin/bash
exec > /tmp/userdata_frontend.log 2>&1

# Actualizar sistema
apt update -y
apt upgrade -y

# Instalar Apache y dependencias
apt install -y apache2 git unzip curl nodejs npm

# Habilitar módulos de Apache necesarios
a2enmod rewrite
a2enmod proxy
a2enmod proxy_http

systemctl enable apache2
systemctl start apache2

# Limpiar carpeta web
rm -rf /var/www/html/*

# Clonar proyecto
cd /home/ubuntu
git clone https://github.com/Adrianasd22/sushi.git
cd sushi

echo "Construyendo Frontend Angular..."
cd frontend/public-angular/front-angular
npm install
npm run build
cd /home/ubuntu/sushi

echo "Construyendo Frontend React..."
cd frontend/front-react
npm install
npm run build
cd /home/ubuntu/sushi

# Copiar builds generados
# Angular
mkdir -p /var/www/html/
cp -r frontend/public-angular/front-angular/dist/* /var/www/html/

# React
mkdir -p /var/www/html/admin
cp -r frontend/front-react/dist/* /var/www/html/admin/

# Crear .htaccess para SPA routing
cat > /var/www/html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF

# Crear .htaccess para React admin
cat > /var/www/html/admin/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
EOF

# Configurar permisos
chmod -R 755 /var/www/html
chown -R www-data:www-data /var/www/html

# Reiniciar Apache
systemctl restart apache2