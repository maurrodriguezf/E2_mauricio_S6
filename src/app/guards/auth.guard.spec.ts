import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should redirect to login when user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    
    const mockUrlTree = {
      queryParams: {}
    } as UrlTree;
    
    router.parseUrl.and.returnValue(mockUrlTree);
    
    const state = { url: '/protected' } as RouterStateSnapshot;
    const result = guard.canActivate(undefined, state);
    
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(mockUrlTree);
    expect(mockUrlTree.queryParams['redirect']).toBe('/protected');
  });

  it('should use default returnUrl when state is not provided', () => {
    authService.isAuthenticated.and.returnValue(false);
    
    const mockUrlTree = {
      queryParams: {}
    } as UrlTree;
    
    router.parseUrl.and.returnValue(mockUrlTree);
    
    const result = guard.canActivate();
    
    expect(mockUrlTree.queryParams['redirect']).toBe('/');
  });
});
