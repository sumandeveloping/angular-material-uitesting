import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  constructor(private _httpClient: HttpClient) {}

  getList<T>(url: string) {
    console.log('service', `${environment.API_URL}/${url}`);
    return this._httpClient
      .get<T[]>(`${environment.API_URL}/${url}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
