import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';  

interface JwtPayload {
  role: { authority: string }[];
  sub: string;  
  iat: number;  
  exp: number;  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  isLoginFailed = false;
  errorMessage = '';
  role: string = ''; 

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  togglePassword() {
    const passwordInput = document.querySelector('.password-wrapper input') as HTMLInputElement;
    const passwordToggleIcon = document.querySelector('.password-toggle') as HTMLElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordToggleIcon.classList.remove('fa-eye');
      passwordToggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      passwordToggleIcon.classList.remove('fa-eye-slash');
      passwordToggleIcon.classList.add('fa-eye');
    }
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const { email, password } = this.user;

      this.authService.login(email, password).subscribe({
        next: data => {
          this.storageService.saveUser(data);

          const token = data.token;
          if (token) {
            try {
              const decodedToken: JwtPayload = jwtDecode(token);
              if (decodedToken.role && decodedToken.role.length > 0) {
                this.role = decodedToken.role[0].authority;
              }
              console.log('Role from token:', this.role);
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          }

          this.redirectBasedOnRole();
        },
        error: err => {
          this.errorMessage = err;
          this.isLoginFailed = true;

          if (err.status === 401) {
            Swal.fire({
              title: "Login Failed",
              text: 'Please check your credentials and try again.',
              icon: "error",
              width: 400, 
              padding: "1em", 
              color: "#d9534f", 
              background: "#fff", 
              showConfirmButton: false,
              timer: 1500
            });
  
                      } else {
                        Swal.fire({
                          position: "center",
                          title: "Login Failed",
                          text: 'Please check your credentials and try again.',
                          icon: "error",
                          width: 300,
                          padding: "1em", 
                          color: "#d9534f",
                          background: "#fff",
                          showConfirmButton: false,
                          timer: 1500,
                                                  
                        });
              
          }
        }
      });
    }
  }

  redirectBasedOnRole(): void {
    switch (this.role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'ROLE_ADMINHR':
        this.router.navigate(['/admin-hr-dashboard']);
        break;
      case 'ROLE_EMPLOYEE':
        this.router.navigate(['/employee-dashboard']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
