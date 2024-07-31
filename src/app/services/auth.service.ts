import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  forgotpassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, email, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword }, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unknown error occurred!';
    if (error.status === 401) {
      errorMsg = 'Incorrect email or password';
    } else if (error.error && error.error.message) {
      errorMsg = error.error.message;
    }
    return throwError(() => new Error(errorMsg));
  }
}
