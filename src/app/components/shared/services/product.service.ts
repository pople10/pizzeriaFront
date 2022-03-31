import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import {ENV} from "../../../../env";


// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currency : string = 'USD';
  public catalogMode : boolean = false;



  public compareProducts : BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {
   this.compareProducts.subscribe(products => products = products)
  }

  public getProductsForAdmin(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${ENV["backend-api-base-url"]}/api/admin/product`);
  }

  public disableProduct(id:number): Observable<any> {
    return this.httpClient.delete<any>(`${ENV["backend-api-base-url"]}/api/admin/product/${id}`);
  }

  public createProduct(prod:Product): Observable<any> {
    return this.httpClient.post<any>(`${ENV["backend-api-base-url"]}/api/admin/product`,prod);
  }

  public updateProduct(prod:Product): Observable<any> {
    return this.httpClient.put<any>(`${ENV["backend-api-base-url"]}/api/admin/product`,prod);
  }

  private products(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${ENV["backend-api-base-url"]}/public/product`);
  }






    // Get Banners
    public getProducts(): Observable<Product[]> {
      return this.products();
    }


      // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${ENV["backend-api-base-url"]}/public/product/${id}`);
  }


        /*
      ---------------------------------------------
      ----------  Compare Product  ----------------
      ---------------------------------------------
   */

// Get Compare Products
public getComapreProducts(): Observable<Product[]> {
  const itemsStream = new Observable(observer => {
    observer.next(products);
    observer.complete();
  });
  return <Observable<Product[]>>itemsStream;
}

// If item is aleready added In compare
public hasProduct(product: Product): boolean {
  const item = products.find(item => item.id === product.id);
  return item !== undefined;
}

 // Add to compare
 public addToCompare(product: Product): Product | boolean {
  let message, status;
  var item: Product | boolean = false;
  if (this.hasProduct(product)) {
    item = products.filter(item => item.id === product.id)[0];
    const index = products.indexOf(item);
    this.snackBar.open('The product  ' + product.title + ' already added to comparison list.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

  } else {
    if(products.length < 4)
      products.push(product);
      message = 'The product ' + product.title + ' has been added to comparison list.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

  }
    localStorage.setItem("compareItem", JSON.stringify(products));
    return item;
}

// Removed Product
public removeFromCompare(product: Product) {
  if (product === undefined) { return; }
  const index = products.indexOf(product);
  products.splice(index, 1);
  localStorage.setItem("compareItem", JSON.stringify(products));
}

}
