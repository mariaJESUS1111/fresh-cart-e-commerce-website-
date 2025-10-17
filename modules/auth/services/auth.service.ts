import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup', data);
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signin', data);
  }
}





