import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginPage } from './login-page';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';


describe('LoginPage', () => {

    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let loginService: jasmine.SpyObj<LoginService>;

    beforeEach(async () => {
        loginService = jasmine.createSpyObj('LoginService', ['login']);

        await TestBed.configureTestingModule({
            imports: [LoginPage],
            providers: [
                { provide: LoginService, useValue: loginService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({}),
                        snapshot: { paramMap: {get: () => null}}
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;

        spyOn(component, 'redirect');

        fixture.detectChanges();
    });

    //Test para el inicio de sesion de admin
    it('test admin (redirige al dashboard)', () => {

        //Respuesta del mock
        const responseMock = {
            access_token: '1234abc',
            user: {
                name: "Joaqui",
                role: "admin"
            }
        };

        loginService.login.and.returnValue(of(responseMock));   //Simula un login exitoso
        spyOn(window, 'alert');     //"Espia" el alert

        /**
         * Por algun motivo, con window.location.href peta a la hora de hacer los test (como una redireccion infinita que nunca llega?)
         * En teoria usando lo mismo pero dentro del redirected este y llamando al propio metodo deberia de funcionar
         */


        component.email.set('joaqui@miyu.com'); //Email del login
        component.password.set('12345678');     //Password del login
        component.onLogin();        //Login real

        expect(loginService.login).toHaveBeenCalled();      //Resultado esperado del test (que haya llamado correctamente a la funcion)
        expect(component.redirect).toHaveBeenCalledWith(
            jasmine.stringContaining(`${environment.dashboardUrl}`)      //Esto, una vez desplegado en AWS petara 100% por tema de que las url cambiaran
        );
    });


    //Test para el inicio de sesion de un usuario normal
    it('debería redirigir al menu si es usuario normal', () => {

        const responseMock = {
            access_token: '1234abc',
            user: {
                name: 'User',
                role: 'user'
            }
        };

        loginService.login.and.returnValue(of(responseMock));

        spyOn(window, 'alert');

        component.email.set('user@miyu.com');
        component.password.set('12345678');
        component.onLogin();

        expect(loginService.login).toHaveBeenCalled();
        expect((component.redirect)).toHaveBeenCalledWith(
            jasmine.stringContaining(`${environment.menuUrl}`)      //Esto, una vez desplegado en AWS petara 100% por tema de que las url cambiaran
        );
    });

    //Los siguientes test son practicamente lo mismo pero cambiando 4 cosas para hacerlos distintios:
    //test de usuario para comprobar que funcione correctamente
    //test de error para comprobar que se controlen correctamente

    //Test de error en el login
    it('debería mostrar error si el login falla', () => {

        const errorMock = {
            error: {
                message: 'Credenciales incorrectas'
            }
        };

        loginService.login.and.returnValue(throwError(() => errorMock));

        spyOn(window, 'alert');
        spyOn(console, 'error');

        component.email.set('test@test.com');
        component.password.set('malpassword');
        component.onLogin();

        expect(console.error).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith(
            'Error de login: Credenciales incorrectas'
        );

    });
});

