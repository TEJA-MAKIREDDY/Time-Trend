import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',//says use globally without import
})
export class AuthService {
  private apiUrl = 'http://localhost:5194/api/auth'; //  API Endpoint

  constructor(private http: HttpClient) {}

  //  LOGIN - Authenticate user and store session data
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('loggedInUser', username);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  //  REGISTER - Send user credentials to backend
  register(username: string, password: string, Security_Question: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password, Security_Question }).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => new Error('Registration failed. Please try again.'));
      })
    );
  }
  
  //  Retrieve Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //  Retrieve Logged-In User
  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  //  Check if User is Authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  //  LOGOUT - Clear user session and user-specific cart
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
  }

  verifySecurityAnswer(username: string, answer: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-security-answer`, { username, answer });
  }

  // Method to reset the password
  resetPassword(username: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { username, newPassword });
  }
}
