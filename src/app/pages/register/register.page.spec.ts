import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { IonicModule } from '@ionic/angular';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let notifySpy: jasmine.SpyObj<NotificationService>;
  let router: Router;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['register']);
    notifySpy = jasmine.createSpyObj('NotificationService', ['show']);

    await TestBed.configureTestingModule({
      imports: [RegisterPage, IonicModule.forRoot(), ReactiveFormsModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: NotificationService, useValue: notifySpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
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

  it('register success navigates to returnUrl', async () => {
    authSpy.register.and.returnValue(Promise.resolve({ success: true, user: { username: 'testuser', email: 'a@test.com' } }));
    const spyNav = spyOn(router, 'navigateByUrl');
    component.form.setValue({ username: 'testuser', email: 'a@test.com', password: '123456', confirm: '123456' });
    await component.submit();
    expect(authSpy.register).toHaveBeenCalled();
    expect(notifySpy.show).toHaveBeenCalled();
    expect(spyNav).toHaveBeenCalled();
  });

  it('register failure shows notification', async () => {
    authSpy.register.and.returnValue(Promise.resolve({ success: false, message: 'exists' }));
    component.form.setValue({ username: 'testuser', email: 'a@test.com', password: '123456', confirm: '123456' });
    await component.submit();
    expect(notifySpy.show).toHaveBeenCalled();
  });
});
