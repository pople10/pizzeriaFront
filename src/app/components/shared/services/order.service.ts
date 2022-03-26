import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modals/order.model';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getTypes(): Observable<any> {
    return this.httpClient.get<any>(`${ENV["backend-api-base-url"]}/public/order/type`);
  }

  createOrder(order:Order): Observable<Order> 
  {
    return this.httpClient.post<Order>(`${ENV["backend-api-base-url"]}/api/user/order`,order);
  }

  getOrders():Observable<Order[]> 
  {
    return this.httpClient.get<Order[]>(`${ENV["backend-api-base-url"]}/api/user/order`);
  }

  getOrdersDelivery():Observable<Order[]> 
  {
    return this.httpClient.get<Order[]>(`${ENV["backend-api-base-url"]}/api/delivery/order`);
  }

  getOrdersURI():string
  {
    return `${ENV["backend-api-base-url"]}/api/user/order`;
  }

  getOrder(id:number):Observable<any> 
  {
    return this.httpClient.get<any>(`${ENV["backend-api-base-url"]}/api/user/order/${id}`);
  }

  getOrderForDelivery(id:number):Observable<any> 
  {
    return this.httpClient.get<any>(`${ENV["backend-api-base-url"]}/api/delivery/order/${id}`);
  }

  MarkOutForDelivery(id:number):Observable<any> 
  {
    return this.httpClient.put<any>(`${ENV["backend-api-base-url"]}/api/delivery/order/${id}/out`,{});
  }

  MarkDelivered(id:number):Observable<any> 
  {
    return this.httpClient.put<any>(`${ENV["backend-api-base-url"]}/api/delivery/order/${id}/deliveried`,{});
  }
}
