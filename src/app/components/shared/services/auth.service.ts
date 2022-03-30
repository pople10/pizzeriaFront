import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../modals/user.model';
import {ENV} from "../../../../env";
import { HandleRequestService } from './handle-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,private authService:AuthService,private handleRequestService:HandleRequestService) { }

  createUser(data:User): Observable<any>{
    return this.httpClient.post<any>(`${ENV["backend-api-base-url"]}/api/admin/account/create`,data);
  }

  register(data:User): Observable<any> {
    return this.httpClient.post<any>(`${ENV["backend-api-base-url"]}/auth/register`,data);
  }

  login(data:any): Observable<any> {
    return this.httpClient.post<any>(`${ENV["backend-api-base-url"]}/auth/login`,data);
  }

  loggedIn(data:any)
  {
    localStorage.setItem("token",data.token.token);
    localStorage.setItem("user",JSON.stringify(
      {email:data.user.email,firstname:data.user.firstname,lastname:data.user.lastname,role:data.user.role}
      ));
  }

  getUser()
  {
    return JSON.parse(localStorage.getItem("user"));
  }

  loggedOut()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  loggedOutV2()
  {
    this.httpClient.delete<any>(`${ENV["backend-api-base-url"]}/`).subscribe(response=>{
        this.handleRequestService.showSuccessWithMessage("Logged out with success");  
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },err=>{
        this.handleRequestService.handleError(err);
    });
  }

  isLoggedIn()
  {
    return localStorage.getItem("token")!=undefined&&localStorage.getItem("token")!=null;
  }
}
