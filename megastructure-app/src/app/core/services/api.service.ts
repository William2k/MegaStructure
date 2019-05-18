import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(
    private httpClient: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string
  ) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.httpClient
      .get(this.baseUrl + path, { params })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: object = {}): Observable<T> {
    return this.httpClient
      .put(this.baseUrl + path, body, this.options)
      .pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.httpClient
      .post(this.baseUrl + path, body, this.options)
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(path: string): Observable<T> {
    return this.httpClient
      .delete(this.baseUrl + path)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
