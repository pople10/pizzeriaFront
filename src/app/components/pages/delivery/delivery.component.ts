import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrderService } from '../../shared/services/order.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit,AfterViewInit,OnDestroy {

  constructor(private productService:ProductService,private router:Router,private renderer:Renderer2,private orderService:OrderService,private handleRequestService:HandleRequestService) { 
  }

  orders:any[]=[];
  products:Product[]=[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataSent:boolean=false;

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("view-order-id")) {
        this.router.navigate(["/pages/order/" + event.target.getAttribute("view-order-id")]);
      }
    });
  }

  getData(flag:boolean=true)
  {
    this.dataSent=true;
    this.productService.getProducts().subscribe(response=>{
      this.products=response;
      this.orderService.getOrdersDelivery().subscribe(response=>{
        this.orders=response;
        this.orders=this.orders.filter((item)=> {
          let key = "status";
          if (item[key] !== undefined && ( item[key] == "PENDING" || item[key]=="OUT_FOR_DELIVERY"))
              return true;
          return false;
        });
        for(let order of this.orders)
        {
          order["productName"]=this.products.find(element => element.id == order.product)?.title;
        }
        if(flag)
          this.dtTrigger.next();
      },err=>{this.handleRequestService.handleError(err);})
      .add(()=>{this.dataSent=false;});
    });
  }
  ngOnInit(): void {
    this.getData();
    this.dtOptions = {
      responsive: true
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
