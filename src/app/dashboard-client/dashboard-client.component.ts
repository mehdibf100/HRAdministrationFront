import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent{
  constructor(private  authService: AuthService,private router: Router) {
  }  logout() {
   this.router.navigate(['/login']);
  }

  }

