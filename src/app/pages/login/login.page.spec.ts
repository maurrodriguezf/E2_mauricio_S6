import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { IonicModule } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let notifySpy: jasmine.SpyObj<NotificationService>;
  let router: Router;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login']);
    notifySpy = jasmine.createSpyObj('NotificationService', ['show']);

    await TestBed.configureTestingModule({
      imports: [LoginPage, IonicModule.forRoot(), ReactiveFormsModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: NotificationService, useValue: notifySpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('login successful navigates to returnUrl', async () => {
    authSpy.login.and.returnValue(Promise.resolve(true));
    const spyNav = spyOn(router, 'navigateByUrl');
    component.form.setValue({ username: 'testuser', password: '123456' });
    await component.submit();
    expect(authSpy.login).toHaveBeenCalledWith('testuser', '123456');
    expect(spyNav).toHaveBeenCalled();
  });

  it('login failure shows notification', async () => {
    authSpy.login.and.returnValue(Promise.reject(new Error('Credenciales inválidas')));
    component.form.setValue({ username: 'testuser', password: 'wrongpw' });
    await component.submit();
    expect(notifySpy.show).toHaveBeenCalled();
  });
});
