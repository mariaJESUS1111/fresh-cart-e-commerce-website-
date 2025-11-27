import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../auth/user/home/models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(this.baseUrl);
  }

  getCategoryById(id: string): Observable<{ data: Category }> {
    return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`);
  }
}
