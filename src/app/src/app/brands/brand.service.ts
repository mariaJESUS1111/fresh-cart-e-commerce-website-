import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../brands/brands.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  getBrands(): Observable<{ data: Brand[] }> {
    return this.http.get<{ data: Brand[] }>(this.apiUrl);
  }

  getBrandById(id: string): Observable<{ data: Brand }> {
    return this.http.get<{ data: Brand }>(`${this.apiUrl}/${id}`);
  }
}
