import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHrComponent } from '../app/dashboard-hr/dashboard-hr.component';
import { DashboardAdminComponent } from '../app/dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from '../app/dashboard-client/dashboard-client.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'admin-dashboard', component: DashboardAdminComponent },
  { path: 'admin-hr-dashboard', component: DashboardHrComponent },
  { path: 'employee-dashboard', component: DashboardClientComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
