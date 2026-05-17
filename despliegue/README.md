## Flujo de Despliegue de Infraestructura
Deberás diseñar e implementar una solución completa que permita desplegar una aplicación PHP en AWS de forma automatizada.

1. Infraestructura con Terraform
Crea una plantilla de Terraform que defina la infraestructura necesaria en AWS para el despliegue de una aplicación PHP, cumpliendo los siguientes requisitos mínimos:

- Una instancia EC2 con:
    - Sistema operativo Ubuntu Server.
    - Servidor web instalado y configurado (Apache).

- Los roles e IAM policies necesarios para permitir el uso de AWS CodeDeploy.

- Configuración básica de red y seguridad:
    - Security Group con los puertos necesarios (HTTP y SSH).

- Configuración de AWS CodeDeploy:
    - Aplicación de CodeDeploy.
    - Deployment Group asociado a la instancia EC2.

La plantilla debe permitir desplegar la infraestructura desde cero usando Terraform (init, plan, apply). `Asegurate que guardas el estado en un bucket de S3.`

2. Automatización con GitHub Actions
Implementa un workflow de GitHub Actions en el repositorio del proyecto que permita automatizar el despliegue de la infraestructura cumpliendo los siguientes requisitos:
- El workflow debe poder ejecutarse:
    - Automáticamente cuando se haga un push a la rama main.
    - Manualmente, mediante workflow_dispatch.

- El flujo debe:
    - Conectarse a AWS utilizando credenciales almacenadas como GitHub Secrets.
    - Haz que terraform aplique los cambios Terraform