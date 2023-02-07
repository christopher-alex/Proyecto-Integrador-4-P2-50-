import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

const LOCAL_STORAGE_TOKEN_ACCESS_KEY = 'access_token';
const LOCAL_STORAGE_TOKEN_REFRESH_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalStorage {
  constructor(private encryptionService: EncryptionService) {}

  setAccessToken(token: string): void {
    const encryptedToken = this.encryptionService.encrypt(token);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_ACCESS_KEY, encryptedToken);
  }
  setUser(user: any): void {
    const encryptedUser = this.encryptionService.encrypt(user);
    localStorage.setItem('user', encryptedUser);
  }
  getUser(): any {
    const encryptedUser = localStorage.getItem("user");
    if (!encryptedUser) {
      return null;
    }
    return this.encryptionService.decrypt(encryptedUser)
  }

  getAccessToken(): string {
    const encryptedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_ACCESS_KEY);
    if (!encryptedToken) {
      return '';
    }
    return this.encryptionService.decrypt(encryptedToken);
  }

  setRefreshToken(token: string): void {
    const encryptedToken = this.encryptionService.encrypt(token);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_REFRESH_KEY, encryptedToken);
  }

  getRefreshToken(): string {
    const encryptedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_REFRESH_KEY);
    if (!encryptedToken) {
      return '';
    }
    return this.encryptionService.decrypt(encryptedToken);
  }

  clear(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_ACCESS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_REFRESH_KEY);
  }
}
