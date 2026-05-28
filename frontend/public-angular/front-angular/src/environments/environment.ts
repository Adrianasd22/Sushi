export const environment = {
  production: true,
  apiUrl: 'http://52.23.82.120:8080/api',       //Temporalmente se quedan con http, pero eventualmente se podria poner con https
  storageUrl: 'http://sushi-imagenes-tfg.s3.us-east-1.amazonaws.com/',
  loginUrl: 'http://52.23.82.120:8080/api/login',
  menuUrl: 'http://sushimiyu.duckdns.com/menu',  //Para el login-page.ts
  dashboardUrl: 'http://sushimiyu.duckdns.com/admin',  //Para login-page.ts (redireccion al dashboard en react)
  redirectRegister: 'http://sushimiyu.duckdns.com/login',  //Para register-page.ts (redirecciona al login tras registrarse)

  apiUrl: 'http://52.23.82.120:8080/api',       //Temporalmente se quedan con http, pero eventualmente se podria poner con https
  storageUrl: 'http://sushi-imagenes-tfg.s3.us-east-1.amazonaws.com/',
  loginUrl: 'http://52.23.82.120:8080/api/login',
  menuUrl: 'http://44.197.79.56/menu',  //Para el login-page.ts
  dashboardUrl: 'http://44.197.79.56/admin',  //Para login-page.ts (redireccion al dashboard en react)
  redirectRegister: 'http://44.197.79.56/login',  //Para register-page.ts (redirecciona al login tras registrarse)

};
