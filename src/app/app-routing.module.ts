import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHrComponent } from '../app/dashboard-hr/dashboard-hr.component';
import { DashboardAdminComponent } from '../app/dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from '../app/dashboard-client/dashboard-client.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminHRGuard } from './guards/admin-hr.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: DashboardAdminComponent, canActivate: [AuthGuard , AdminGuard]   },
  { path: 'admin-hr-dashboard', component: DashboardHrComponent, canActivate: [AuthGuard , AdminHRGuard] },
  { path: 'employee-dashboard', component: DashboardClientComponent, canActivate: [AuthGuard , EmployeeGuard] },
  {path: 'unauthorized',component:UnauthorizedComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
