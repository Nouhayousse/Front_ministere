import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    
    if (!token) {
      console.log('No token found, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }

    if (this.authService.isTokenExpired()) {
      console.log('Token expired, redirecting to login');
      this.authService.logout(); // This will clear tokens and redirect
      return false;
    }

    console.log('Token valid, access granted');
    return true;
  }
}