import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  clean(): void {
    if (this.isBrowser) {
      window.sessionStorage.clear();
    }
  }

  public getToken(): string | null {
    const user = this.getUser();
    return user ? user.token : null;
  }
  
  public saveUser(user: any): void {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (this.isBrowser) {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return { role: '' }; 
  }

  public isLoggedIn(): boolean {
    if (this.isBrowser) {
      const user = window.sessionStorage.getItem(USER_KEY);
      return user !== null;
    }
    return false;
  }
}
