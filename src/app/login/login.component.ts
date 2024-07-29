import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { emit } from 'process';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private  authService: AuthServiceService,private router: Router) {
  }
  user={
    email:"",
    password:"",
  }
  Login() {
    this.authService.login(this.user).subscribe(
      (res: any) => {
       // console.log("yy" , res);
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', JSON.stringify({ token: res.token }))
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
