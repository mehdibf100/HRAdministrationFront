import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  role: { authority: string }[];
  sub: string;  
  iat: number;  
  exp: number;  
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const token = this.storageService.getToken();
    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode(token);
        if (decodedToken.role && decodedToken.role[0] && decodedToken.role[0].authority) {
          if (decodedToken.role[0].authority.includes('ROLE_ADMIN')) {
            return true;
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    
    this.router.navigate(['/unauthorized']); 
    return false;
  }
}
