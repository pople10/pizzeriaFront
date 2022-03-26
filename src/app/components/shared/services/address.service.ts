import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/modals/address.model';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  createAddress(address:Address): Observable<Address>
  {
    return this.httpClient.post<Address>(`${ENV["backend-api-base-url"]}/api/user/address`,address);
  }

  getAllAddresses(): Observable<Address[]>
  {
    return this.httpClient.get<Address[]>(`${ENV["backend-api-base-url"]}/api/user/address`);
  }
}
