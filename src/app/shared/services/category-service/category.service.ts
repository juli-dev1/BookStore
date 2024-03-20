import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Category } from '../../types/Category.types';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiServerUrl}/categories`);
  }

  getCategoryById(id: Category['id']): Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiServerUrl}/categories${id}`);
  }
}
