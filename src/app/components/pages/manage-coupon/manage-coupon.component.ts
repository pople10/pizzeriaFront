import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Coupon } from 'src/app/modals/coupon.model';
import { CouponService } from '../../shared/services/coupon.service';
import { HandleRequestService } from '../../shared/services/handle-request.service';

@Component({
  selector: 'app-manage-coupon',
  templateUrl: './manage-coupon.component.html',
  styleUrls: ['./manage-coupon.component.sass']
})
export class ManageCouponComponent implements OnInit {

  constructor(public domSanitizer: DomSanitizer,
    private couponService:CouponService,
    private router:Router,
    private renderer:Renderer2,
    private handleRequestService:HandleRequestService) { 
  }
  coupons: Coupon[]=[];
  data:Coupon=new Coupon();
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataSent:boolean=false;
  isSubmitted:boolean=false;
  type:any[];

  createCouponForm = new FormGroup({
    code: new FormControl('',
    [
      Validators.required
    ]),
    amount: new FormControl(
    '',
    [
      Validators.required
    ]),
    type:new FormControl(
      '',
      [
        Validators.required
      ]),
    expiration_tmp:new FormControl(
      '',
      [
        Validators.required
      ])
  });

  get form()
  {
    return this.createCouponForm.controls;
  }

  get colorCreateCoupon()
  {
    if(this.createCouponForm.valid)
      return "primary";
    return "accent";
  }

  cancel()
  {
    this.data=new Coupon();
  }

  createCoupon(event)
  {
    event.preventDefault();
    this.isSubmitted=true;
    if(this.createCouponForm.valid)
    {
      this.dataSent=true;
      this.data.expiration=this.data.expiration_tmp.toString().replace("T"," ")+":00"; 
      if(this.data.id)
      {
        this.couponService.updateCoupon(this.data).subscribe(response=>{
            this.handleRequestService.showSuccess();
            this.data=new Coupon();
            this.couponService.getCoupons().subscribe(response=>{
              this.coupons=response;
            });
        },err=>{
          this.handleRequestService.handleError(err);
        }).add(()=>{
          this.dataSent=false;
        });
        this.isSubmitted=false;
        return;
      }
      this.couponService.createCoupon(this.data).subscribe(response=>{
          this.handleRequestService.showSuccess();
          this.data=new Coupon();
          this.couponService.getCoupons().subscribe(response=>{
            this.coupons=response;
          });
      },err=>{
        this.handleRequestService.handleError(err);
      }).add(()=>{
        this.dataSent=false;
      });
      this.isSubmitted=false;
    }
  }

  onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        evt.preventDefault();
    return true;
  }

 
  deleteCoupon(id: string) {
    this.dataSent=true;
    this.couponService.deleteCoupon(id).subscribe(response => {
      this.couponService.getCoupons().subscribe(response=>{
        this.coupons=response;
      });
      this.handleRequestService.showSuccess();
    },err=>{
      this.handleRequestService.handleError(err);
    }).add(()=>{
      this.dataSent=false;
    });
  }

  updateCoupon(id:number)
  {
    this.data=this.coupons.find(element=>element.id==id);
    if(this.data==null||this.data==undefined)
      this.data=new Coupon();
    this.data.expiration_tmp=null;
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });

  }
  

  ngOnInit(): void {
    this.couponService.getTypes().subscribe(response=>{
      this.type=response;
    });
    this.couponService.getCoupons().subscribe(response=>{
      this.coupons=response;
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
