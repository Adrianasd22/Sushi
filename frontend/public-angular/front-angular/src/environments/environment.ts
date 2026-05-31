export const environment = {
  production: true,
  apiUrl: 'https://sushimiyu2-api.duckdns.org/api',       //Temporalmente se quedan con http, pero eventualmente se podria poner con https
  storageUrl: 'https://sushi-imagenes-tfg.s3.us-east-1.amazonaws.com/',
  loginUrl: 'https://sushimiyu2-api.duckdns.org/api/login',
  menuUrl: 'https://sushimiyu2.duckdns.org/menu',  //Para el login-page.ts
  dashboardUrl: 'https://sushimiyu2.duckdns.org/admin',  //Para login-page.ts (redireccion al dashboard en react)
  redirectRegister: 'https://sushimiyu2.duckdns.org/login',  //Para register-page.ts (redirecciona al login tras registrarse)
  defaultAngular: 'https://sushimiyu2.duckdns.org'  //Para el resto de componentes que necesiten hacer peticiones a la api,
};
