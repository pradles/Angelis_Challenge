import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private jsonDataPath = '../../assets/products.json'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonDataPath);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any[]>(this.jsonDataPath).pipe(
      map(data => data.find(item => item.id === id))
    );
  }
}
