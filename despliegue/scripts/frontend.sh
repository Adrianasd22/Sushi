#!/bin/bash
exec > /tmp/userdata_frontend.log 2>&1

# Actualizar sistema
apt update -y
apt upgrade -y

# Instalar Apache y dependencias
apt install -y apache2 git unzip curl

#Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Habilitar módulos de Apache necesarios
a2enmod rewrite
a2enmod proxy
a2enmod proxy_http
systemctl enable apache2
systemctl start apache2

# Clonar proyecto
cd /home/ubuntu
git clone https://github.com/Adrianasd22/sushi.git


# Build angular
cd /home/ubuntu/sushi/frontend/public-angular/front-angular
npm install
npx ng build --configuration production


# Build React
cd /home/ubuntu/sushi/frontend/front-react
npm install
npm run build
# Vite genera en dist/



# ── INYECTAR IP DEL BACKEND con sed ───────────────────────
# Terraform pasa la IP real como variable al script
BACKEND_IP="${backend_ip}"

# Reemplazar la IP hardcodeada en los bundles ya compilados
# Angular — busca en los .js del build
find /home/ubuntu/sushi/frontend/public-angular/front-angular/dist/front-angular/browser/ \
  -name "*.js" \
  -exec sed -i "s|http://52\.23\.82\.120:8080|http://$BACKEND_IP:8080|g" {} +



# --- DESPLEGAR ---
# Limpiar carpeta web
rm -rf /var/www/html/*

# Copiar builds ya generados
# Angular
# --- mkdir -p /var/www/html/
cp -r /home/ubuntu/sushi/frontend/public-angular/front-angular/dist/front-angular/browser/. /var/www/html/

# React
mkdir -p /var/www/html/admin
cp -r /home/ubuntu/sushi/frontend/front-react/dist/. /var/www/html/admin/

# Crear .htaccess para SPA routing
cat > /var/www/html/.htaccess << 'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %%{REQUEST_FILENAME} !-f
  RewriteCond %%{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
HTACCESS

# Crear .htaccess para React admin
cat > /var/www/html/admin/.htaccess << 'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %%{REQUEST_FILENAME} !-f
  RewriteCond %%{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
HTACCESS

# VirtualHost con AllowOverride All (sin esto el .htaccess no funciona)
cat > /etc/apache2/sites-available/000-default.conf << 'EOF'
<VirtualHost *:80>
  DocumentRoot /var/www/html

  <Directory /var/www/html>
    AllowOverride All
    Require all granted
  </Directory>

  <Directory /var/www/html/admin>
    AllowOverride All
    Require all granted
  </Directory>

</VirtualHost>
EOF

# Configurar permisos
chmod -R 755 /var/www/html
chown -R www-data:www-data /var/www/html

# Reiniciar Apache
systemctl restart apache2