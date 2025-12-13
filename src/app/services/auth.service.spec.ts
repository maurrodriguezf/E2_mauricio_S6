import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user successfully', async () => {
    const mockResponse = {
      success: true,
      user: { id: 1, username: 'testuser', email: 'test@test.com' },
      token: 'mock-jwt-token'
    };

    const registerPromise = service.register('testuser', 'test@test.com', 'password123');

    const req = httpMock.expectOne(`${apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123'
    });
    req.flush(mockResponse);

    const result = await registerPromise;
    expect(result.success).toBeTrue();
    expect(result.user?.username).toBe('testuser');
  });

  it('should handle registration error', async () => {
    const mockErrorResponse = {
      success: false,
      message: 'El usuario ya existe'
    };

    const registerPromise = service.register('testuser', 'test@test.com', 'password123');

    const req = httpMock.expectOne(`${apiUrl}/auth/register`);
    req.flush(mockErrorResponse, { status: 409, statusText: 'Conflict' });

    const result = await registerPromise;
    expect(result.success).toBeFalse();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      success: true,
      user: { id: 1, username: 'testuser', email: 'test@test.com' },
      token: 'mock-jwt-token'
    };

    const loginPromise = service.login('testuser', 'password123');

    const req = httpMock.expectOne(`${apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'testuser',
      password: 'password123'
    });
    req.flush(mockResponse);

    const result = await loginPromise;
    expect(result).toBeTrue();
    expect(service.getToken()).toBe('mock-jwt-token');
  });

  it('should handle login error', async () => {
    const loginPromise = service.login('testuser', 'wrongpassword');

    const req = httpMock.expectOne(`${apiUrl}/auth/login`);
    req.flush({ success: false, message: 'Credenciales inválidas' }, { status: 401, statusText: 'Unauthorized' });

    try {
      await loginPromise;
      fail('Should have thrown error');
    } catch (error: any) {
      expect(error.message).toContain('Credenciales inválidas');
    }
  });

  it('should logout and clear storage', () => {
    localStorage.setItem('auth_token', 'test-token');
    localStorage.setItem('current_user', JSON.stringify({ id: 1, username: 'test' }));
    
    service.logout();
    
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('current_user')).toBeNull();
  });

  it('should return true when authenticated', () => {
    localStorage.setItem('auth_token', 'test-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should get user from storage', () => {
    const user = { id: 1, username: 'testuser', email: 'test@test.com' };
    localStorage.setItem('current_user', JSON.stringify(user));
    
    const retrieved = service.getUser();
    expect(retrieved).toEqual(user);
  });

  it('should return null when no user in storage', () => {
    const user = service.getUser();
    expect(user).toBeNull();
  });

  it('should get auth headers with token', () => {
    localStorage.setItem('auth_token', 'test-token');
    
    const headers = service.getAuthHeaders();
    expect(headers.get('Authorization')).toBe('Bearer test-token');
  });
});
