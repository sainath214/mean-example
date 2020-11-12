import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
import { ApiResponse } from '../Model/api-response';

@Injectable({
  providedIn: 'root'
})


export class ServicesService {


  constructor(private http: HttpClient) {

  }

  baseUrl = "http://localhost:3300/api/";

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'products');
  }

  createProduct(product: Product): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'product/add', product);
  }

  getProductDetails(productId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + '/product/details/' + productId);
  }

  deleteProduct(productId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + 'product/delete/' + productId);
  }

  login(loginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'login', loginData);
  }
}
