import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modals/user.model';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  
  getUsers():Observable<User[]> 
  {
    return this.httpClient.get<User[]>(`${ENV["backend-api-base-url"]}/api/admin/account`);
  }

  getUser(id:number):Observable<User>{
    return this.httpClient.get<User>(`${ENV["backend-api-base-url"]}/api/admin/account/${id}`);
  }

  disableUser(id:number):Observable<User>{
    return this.httpClient.delete<any>(`${ENV["backend-api-base-url"]}/api/admin/account/${id}`);
  }

 
}
