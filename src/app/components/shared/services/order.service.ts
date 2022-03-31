import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modals/order.model';
import { User } from 'src/app/modals/user.model';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getStatus():Observable<any[]>
  {
    return this.httpClient.get<any[]>(`${ENV["backend-api-base-url"]}/api/admin/status`);
  } 

  getDelivery():Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${ENV["backend-api-base-url"]}/api/admin/delivery`);
  }

  setStatus(id:number,status:string):Observable<any>
  {
    return this.httpClient.put<any>(`${ENV["backend-api-base-url"]}/api/admin/order/${id}/status/${status}`,{});
  }

  setDelivery(id:number,delivery:number):Observable<any>
  {
    let body = new URLSearchParams();
    body.set('delivery', delivery.toString());
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    return this.httpClient.put<any>(`${ENV["backend-api-base-url"]}/api/admin/order/${id}/delivery`, body.toString(), options);
  }

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

  getOrdersForAdmin():Observable<Order[]> 
  {
    return this.httpClient.get<Order[]>(`${ENV["backend-api-base-url"]}/api/admin/order`);
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

  getOrderForAdmin(id:number):Observable<any> 
  {
    return this.httpClient.get<any>(`${ENV["backend-api-base-url"]}/api/admin/order/${id}`);
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
