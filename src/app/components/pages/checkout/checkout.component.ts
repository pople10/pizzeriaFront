import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { Address } from 'src/app/modals/address.model';
import { AddressService } from '../../shared/services/address.service';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrderService } from '../../shared/services/order.service';
import { Order } from 'src/app/modals/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  public address:Address=new Address();
  public types:any[]=[];
  public addresses:Address[]=[];

  public order:Order=new Order();

  amount: number;
  dataSent:boolean=false;
  isSubmitted:boolean=false;

  constructor(private router:Router,private orderService:OrderService,private cartService: CartService, public productService: ProductService,private addressService:AddressService,private handleRequestService:HandleRequestService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.buyProducts = products);
    if(this.buyProducts.length==0)
    {
      this.router.navigate(["/home"]);
      return;
    }
    this.getTotal().subscribe(amount => this.amount = amount);
    this.orderService.getTypes().subscribe(response=>{this.types=response;},err=>{this.handleRequestService.handleError(err);});
    this.getAddresses();
  }

  getAddresses()
  {
    this.addressService.getAllAddresses().subscribe(response=>{this.addresses=response;},err=>{this.handleRequestService.handleError(err);});
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  submitAddress(event)
  {
    event.preventDefault();
    if(this.address.isValid())
    {
      this.dataSent=true;
      this.address.country="FR";
      this.addressService.createAddress(this.address).subscribe((response)=>{
        this.handleRequestService.showSuccess();
        this.address.clear();
        this.getAddresses();
      },err=>{
        this.handleRequestService.handleError(err);
      }).add(()=>{this.dataSent=false;});
    }
  }

  get addressBtnColor()
  {
    if(this.address.isValid())
      return "primary";
    return "accent";
  }

  submitOrder(event)
  {
    event.preventDefault();
    this.isSubmitted=true;
    if(this.isValidOrder())
    {
      if(this.order.coupon!=null||this.order.coupon!=undefined)
        this.order.coupon=(this.order.coupon.trim()==""?null:this.order.coupon);
      this.order.wanted_at=this.order.wanted.toString().replace("T"," ")+":00";
      this.order.product=this.buyProducts[0].product.id;
      this.dataSent=true;
      this.orderService.createOrder(this.order).subscribe(response=>{
        this.isSubmitted=false;
        this.handleRequestService.showSuccess();
        setTimeout(()=>{
          this.router.navigate(["/pages/order",response.id]);
        },1500);
      },err=>{this.handleRequestService.handleError(err);})
      .add(()=>{
        this.dataSent=false;
      });
    }
  }

  isValidOrder():boolean
  {
    if(this.order.address==null||this.order.address==undefined||!this.order.address)
      return false;
    if(this.order.wanted==null||this.order.wanted==undefined||!this.order.wanted)
      return false;
    if(this.order.type==null||this.order.type==undefined||this.order.type.trim()=="")
      return false;
    return true;
  }

  get orderBtnColor()
  {
    if(this.isValidOrder())
      return "primary";
    return "accent";
  }
}
