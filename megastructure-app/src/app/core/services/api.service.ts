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

  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + path, { params })
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(this.baseUrl + path, body, this.options)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + path, body, this.options)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient
      .delete(this.baseUrl + path)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
