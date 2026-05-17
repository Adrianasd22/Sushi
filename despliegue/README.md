# Despliegue - AWS Deployment
Este proyecto es una aplicación web completa con arquitectura distribuida desplegada en AWS usando Terraform, Docker y EC2.

# Arquitectura
El sistema está dividido en dos servidores:

## Frontend EC2
- Apache
- Angular (cliente)
- React (panel admin)

Rutas:
- `/` → Angular
- `/admin` → React Admin

## ⚙️ Backend EC2
- Laravel API
- MySQL (Docker)
- phpMyAdmin

Rutas:
- `/api` → Laravel
- `:8081` → phpMyAdmin


# Infraestructura (AWS + Terraform)
Se crean automáticamente:
- 1 EC2 frontend
- 1 EC2 backend
- Elastic IPs
- Security Groups
- Ubuntu 22.04 LTS (AMI automática)

# Despliegue automático
Cada servidor se configura automáticamente con scripts:

## Frontend
- Instala Apache
- Copia Angular + React ya compilados
- Sirve contenido estático

## Backend
- Instala Docker
- Clona repositorio
- Levanta Laravel + MySQL con Docker Compose

# Requisitos
- AWS Account
- Terraform instalado
- AWS CLI configurado
- Key pair en AWS (vockey o similar)

# Cómo desplegar

## 1. Inicializar Terraform
```bash
cd despliegue
terraform init
```

## 2. Planificar infraestructura
```bash
terraform plan
```

## 3. Crear infraestructura
```bash
terraform apply
```

## 4. Obtener IPs
Terraform mostrará:
- frontend_ip
- backend_ip

# Acceso

## Frontend
```
http://FRONTEND_IP/
```

## Admin
```
http://FRONTEND_IP/admin
```

## Backend API
```
http://BACKEND_IP:8000/api
```
