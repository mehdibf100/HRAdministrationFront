import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './service/custom.interceptor';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
export function tokenGetter() {
  return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).token : null;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardClientComponent,

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
    provideAnimationsAsync(),[provideHttpClient(withFetch())],
      { provide:  HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
