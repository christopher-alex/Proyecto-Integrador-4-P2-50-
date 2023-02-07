import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './models/user.interface';
import { AuthLocalStorage } from './auth-local-storage';
import { AuthValidator } from './auth-validator';
import { Router } from '@angular/router';

const API_URL = environment.API_URL + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authLocalStorage: AuthLocalStorage,
    private authValidator: AuthValidator
  ) {}

  isAuthenticated(): boolean {
    return this.authValidator.isTokenValid(
      this.authLocalStorage.getAccessToken()
    );
  }
  isAuthorized(): boolean {
    return this.authValidator.hasPermission(this.authLocalStorage.getAccessToken());
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/login`, { email, password }, this.httpOptions)
      .pipe(
        map((response) => {
          console.log(response);
          this.authLocalStorage.setAccessToken(response.token);
          this.authLocalStorage.setUser(response.user);
          return response;

        }),
        catchError(this.handleError<any>('login'))
      );
  }

  register(fullName:string, email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/register`, { fullName, email, password }, this.httpOptions)
      .pipe(
        map((response) => {
          console.log(response);
          this.authLocalStorage.setAccessToken(response.token);
          return response;
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${API_URL}/logout`, this.httpOptions).pipe(
      map((response) => {
        this.authLocalStorage.clear();

        this.router.navigate(['/auth/login']);
        return response;
      }),
      catchError(this.handleError('logout'))
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${API_URL}/profile`, this.httpOptions);
  }

  updateProfile(user: User): Observable<User> {
    return this.http
      .put<User>(`${API_URL}/profile`, user, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError<any>('updateProfile'))
      );
  }

  refreshAccessToken(token: string): Observable<any> {
    if (!this.authValidator.isTokenValid(token)) {
      return of(null);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'refresh-token': token,
      }),
    };
    return this.http.post<any>(`${API_URL}/refresh`, {}, httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
