import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrdersService } from '../../shared/services/orders.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit,AfterViewInit,OnDestroy {
  

  constructor(
    private router:Router,
    private renderer:Renderer2,
    private ordersService:OrdersService,
    private handleRequestService:HandleRequestService) { 
  }

  orders:any[]=[];  
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
    
    this.ordersService.getOrders().subscribe(response=>{
      this.orders=response;
      this.dtTrigger.next();
    },err=>{this.handleRequestService.handleError(err);});
    
    this.dtOptions = {
      responsive: true
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
