import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _httpClient: any;
  constructor(private http: HttpClient) {}

  // ✅ Get all categories
  getCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'categories');
  }

  // ✅ Get category by ID


    getCategoryById(id: string) {
  return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
}

  }

