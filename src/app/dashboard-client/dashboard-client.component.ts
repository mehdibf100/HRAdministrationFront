import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent{
  constructor(private  authService: AuthServiceService,private router: Router) {
  }  logout() {
    this.authService.logout();
   this.router.navigate(['/login']);
  }

  }

