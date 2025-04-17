// WatchEcom.App/src/app/services/wishlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5194/api/wishlist';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addToWishlist(watchId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${watchId}`, {}, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  removeFromWishlist(watchId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${watchId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Wishlist service error:', error);
    if (error.status === 401) {
      // Unauthorized - user needs to log in
      return throwError(() => new Error('Please log in to access your wishlist'));
    }
    return throwError(() => new Error('An error occurred while managing your wishlist'));
  }
}