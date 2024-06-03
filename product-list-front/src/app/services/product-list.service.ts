import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(
    @Inject('BASE_API_URL') private apiUrl: string, 
    private http: HttpClient
    
  ) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/products" + "/all");
  }

  saveProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl + "/products" + "/create", JSON.stringify(product), {headers});
  }

  update(product: Product): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/products" + `/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + "/products"}/${id}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl + "/products"}/${id}`);
  }


}
