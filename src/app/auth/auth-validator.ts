import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthTokenDecoder } from './auth-token-decoder';

@Injectable({
  providedIn: 'root',
})
export class AuthValidator {
  private jwtHelper = new JwtHelperService();

  constructor(
    private decodeToken: AuthTokenDecoder
  ) {}

  isTokenValid(token: string): boolean {
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  hasPermission(token: string): boolean {
    if (!this.isTokenValid(token)) {
      return false;
    }
    const permissionsUser = this.decodeToken.decodeToken(token).user;
    if (permissionsUser ) {
      return permissionsUser.role === 'admin';
    } else {
      return false;
    }
  }
}
