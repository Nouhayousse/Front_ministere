import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('access_token'); // ou 'token' selon ton stockage
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  isAdmin(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;
    if (this.isTokenExpired()) return false;
    return decoded.sub === 'admin'; // ou ta logique de rôle
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
