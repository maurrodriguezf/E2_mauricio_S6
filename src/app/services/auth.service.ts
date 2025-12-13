import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  /**
   * Obtiene el usuario actual del localStorage
   */
  private getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Obtiene el token actual
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Verifica el estado de autenticación con el backend
   */
  private async checkAuthStatus(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        const response = await this.http.post<AuthResponse>(
          `${this.apiUrl}/auth/verify`,
          { token }
        ).toPromise();

        if (response?.success && response.user) {
          this.currentUserSubject.next(response.user);
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Error verificando token:', error);
        this.logout();
      }
    }
  }

  /**
   * Registra un nuevo usuario
   */
  async register(username: string, email: string, password: string): Promise<{ success: boolean; message?: string; user?: any }> {
    try {
      const response = await this.http.post<AuthResponse>(
        `${this.apiUrl}/auth/register`,
        { username, email, password }
      ).toPromise();

      if (response?.success && response.token && response.user) {
        this.saveAuthData(response.token, response.user);
        return { success: true, user: response.user };
      }
      return { success: false, message: response?.message || 'Error al registrar' };
    } catch (error: any) {
      console.error('Error en registro:', error);
      return { success: false, message: error.error?.message || 'Error al registrar usuario' };
    }
  }

  /**
   * Inicia sesión
   */
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<AuthResponse>(
        `${this.apiUrl}/auth/login`,
        { username, password }
      ).toPromise();

      if (response?.success && response.token && response.user) {
        this.saveAuthData(response.token, response.user);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error en login:', error);
      throw new Error(error.error?.message || 'Error al iniciar sesión');
    }
  }

  /**
   * Cierra sesión
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Obtiene el usuario actual
   */
  getUser(): User | null {
    return this.getCurrentUser();
  }

  /**
   * Guarda los datos de autenticación
   */
  private saveAuthData(token: string, user: User): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Obtiene los headers con autenticación
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  /**
   * Obtiene información del usuario autenticado desde el backend
   */
  async getMe(): Promise<User | null> {
    try {
      const response = await this.http.get<AuthResponse>(
        `${this.apiUrl}/auth/me`,
        { headers: this.getAuthHeaders() }
      ).toPromise();

      if (response?.success && response.user) {
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        return response.user;
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }
}
