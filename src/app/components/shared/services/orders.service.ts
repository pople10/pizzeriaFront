import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modals/order.model';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<Order[]> 
  {
    return this.httpClient.get<Order[]>(`${ENV["backend-api-base-url"]}/api/admin/order`);
  }


}
