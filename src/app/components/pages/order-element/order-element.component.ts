import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-element',
  templateUrl: './order-element.component.html',
  styleUrls: ['./order-element.component.sass']
})
export class OrderElementComponent implements OnInit {
  order:any={};

  constructor(private handleRequestService:HandleRequestService,private orderService:OrderService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.queryParams;
    this.route.params
      .subscribe(params => {
        this.orderService.getOrder(params?.id).subscribe(response=>{
          this.order=response;
        },err=>{
          this.handleRequestService.handleErrorWithCallBack(err,()=>{this.router.navigate(["/home"]);})
        })
      }
    );
    
  }

}
