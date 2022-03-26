import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-delivery-element',
  templateUrl: './delivery-element.component.html',
  styleUrls: ['./delivery-element.component.sass']
})
export class DeliveryElementComponent implements OnInit {

  order:any={};

  dataSent:boolean=false;

  constructor(private handleRequestService:HandleRequestService,private orderService:OrderService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.queryParams;
    this.route.params
      .subscribe(params => {
        this.getData(params?.id);
      }
    );
  }

  getData(id)
  {
    this.dataSent=true;
    this.orderService.getOrderForDelivery(id).subscribe(response=>{
      this.order=response;
    },err=>{
      this.handleRequestService.handleErrorWithCallBack(err,()=>{this.router.navigate(["/home"]);})
    })
    .add(()=>{this.dataSent=false;});
  }

  outForDelivery()
  {
    this.dataSent=true;
    let id=this.order.order.id;
    this.orderService.MarkOutForDelivery(id).subscribe(response=>{
      this.handleRequestService.showSuccess();
      this.getData(id);
    },err=>{this.handleRequestService.handleError(err);})
    .add(()=>{this.dataSent=false;});
  }

  delivered()
  {
    this.dataSent=true;
    let id=this.order.order.id;
    this.orderService.MarkDelivered(id).subscribe(response=>{
      this.handleRequestService.showSuccess();
      this.getData(id);
    },err=>{this.handleRequestService.handleError(err);})
    .add(()=>{this.dataSent=false;});
  }
}
