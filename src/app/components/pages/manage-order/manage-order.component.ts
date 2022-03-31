import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrderService } from '../../shared/services/order.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.sass']
})
export class ManageOrderComponent implements OnInit,OnDestroy,AfterViewInit {



  constructor(private productService:ProductService,private router:Router,private renderer:Renderer2,private orderService:OrderService,private handleRequestService:HandleRequestService) { 
  }

  orders:any[]=[];
  products:Product[]=[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("view-order-id")) {
        this.router.navigate(["/pages/order/" + event.target.getAttribute("view-order-id")]);
      }
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response=>{
      this.products=response;
      this.orderService.getOrdersForAdmin().subscribe(response=>{
        this.orders=response;
        for(let order of this.orders)
        {
          order["productName"]=this.products.find(element => element.id == order.product)?.title;
        }
        this.dtTrigger.next();
      },err=>{this.handleRequestService.handleError(err);});
    });
    this.dtOptions = {
      responsive: true
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
