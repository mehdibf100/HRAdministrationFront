import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Import provideHttpClient and withFetch
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardHrComponent } from './dashboard-hr/dashboard-hr.component';

export function tokenGetter() {
  return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).token : null;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAdminComponent,
    DashboardHrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['your-api-url.com'],
        disallowedRoutes: ['your-api-url.com/auth/login']
      }
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()) // Add this line to enable fetch API
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
