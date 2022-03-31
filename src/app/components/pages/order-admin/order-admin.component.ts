import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modals/user.model';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.sass']
})
export class OrderAdminComponent implements OnInit {
  order:any={};
  status:any[]=[];
  deliveries:User[]=[];
  statusSelected:string=null;
  deliverySelected:number=null;
  flag1:boolean=false;
  flag2:boolean=false;
  dataSent:boolean=false;

  constructor(private handleRequestService:HandleRequestService,private orderService:OrderService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.queryParams;
    this.route.params
      .subscribe(params => {
        this.orderService.getOrderForAdmin(params?.id).subscribe(response=>{
          this.order=response;
          this.statusSelected=this.order.order.status;
          if(this.order.delivery)
            this.deliverySelected=this.order.delivery.id;
          this.orderService.getStatus().subscribe(response=>{
            this.status=response;
            this.orderService.getDelivery().subscribe(response=>{this.deliveries=response;});
          });
        },err=>{
          this.handleRequestService.handleErrorWithCallBack(err,()=>{this.router.navigate(["/home"]);})
        })
      }
    );
  }

  private getData()
  {
    this.orderService.getOrderForAdmin(this.order.order.id).subscribe(response=>{
      this.order=response;
    });
  }

  changeStatus()
  {
    this.flag1=true;
    if(this.statusSelected&&this.statusSelected.trim()!="")
    {
      this.dataSent=true;
      this.flag1=false;
      this.orderService.setStatus(this.order.order.id,this.statusSelected).subscribe(response=>{
        this.handleRequestService.showSuccess();
        this.getData();
      },err=>{this.handleRequestService.handleError(err)})
      .add(()=>{this.dataSent=false;});
    }
  }

  changeDelivery()
  {
    this.flag1=true;
    if(this.deliverySelected)
    {
      this.dataSent=true;
      this.flag1=false;
      this.orderService.setDelivery(this.order.order.id,this.deliverySelected).subscribe(response=>{
        this.handleRequestService.showSuccess();
        this.getData();
      },err=>{this.handleRequestService.handleError(err)})
      .add(()=>{this.dataSent=false;});
    }
  }

}
