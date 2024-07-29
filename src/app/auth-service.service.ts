import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from './auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  url="http://localhost:8081/api/auth/"
  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {
  }
  login(user:any):Observable<any>{
    console.log(user);
    return this.http.post(this.url+'signin',user).pipe(map(response => {
      console.log('API Response:', response); // Ajoutez ce log pour voir la réponse
      return response;
    }));

  }
  getUsers():Observable<any>{
    return this.http.get(this.url+'user')
}
  logout(): void {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).token : null;
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
