import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private router:Router) {}

  private endpoint(path: string): string {
    // ensure we don't create double slashes
    const base = environment.apiUrl?.replace(/\/+$/, '') ?? '';
    const p = path?.replace(/^\/+/, '') ?? '';
    return `${base}/${p}`;
  }

  register(data: any): Observable<any> {
    return this.http.post(this.endpoint('auth/signup'), data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.endpoint('auth/signin'), data);
  }
  decodeToken(){
    try{
    const decoded = jwtDecode(localStorage.getItem('authToken')!);

console.log(decoded);
    }
     catch {
      this.logout()
     }


  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

logout() {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}

}


