import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/modals/coupon.model';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private httpClient:HttpClient) { }

  getTypes(): Observable<any> {
    return this.httpClient.get<any>(`${ENV["backend-api-base-url"]}/public/coupon/type`);
  }

  createCoupon(coupon:Coupon): Observable<Coupon> 
  {
    return this.httpClient.post<Coupon>(`${ENV["backend-api-base-url"]}/api/admin/coupon`,coupon);
  }
  

  updateCoupon(coupon:Coupon): Observable<Coupon> 
  {
    return this.httpClient.put<Coupon>(`${ENV["backend-api-base-url"]}/api/admin/coupon`,coupon);
  }

  getCoupons(): Observable<Coupon[]> 
  {
    return this.httpClient.get<Coupon[]>(`${ENV["backend-api-base-url"]}/api/admin/coupon`);
  }

  deleteCoupon(id:string): Observable<any> 
  {
    return this.httpClient.delete<any>(`${ENV["backend-api-base-url"]}/api/admin/coupon/${id}`);
  }
}
