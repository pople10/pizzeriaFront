import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { ProductService } from '../../shared/services/product.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.sass']
})
export class ManageProductComponent implements OnInit,OnDestroy {

  constructor(public domSanitizer: DomSanitizer,
    private productService:ProductService,
    private router:Router,
    private renderer:Renderer2,
    private handleRequestService:HandleRequestService) { 
  }
  products: Product[]=[];
  data:Product=new Product();
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataSent:boolean=false;
  isSubmitted:boolean=false;

  createProductForm = new FormGroup({
    title: new FormControl('',
    [
      Validators.required
    ]),
    description: new FormControl(
    '',
    [
      Validators.required
    ]),
    price:new FormControl(
      '',
      [
        Validators.required
      ]),
      preparation_time_in_min:new FormControl(
      '',
      [
        Validators.required
      ])
  });

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.dataSent=true;
      let files= new ImageSnippet(event.target.result, file);
      this.dataSent=false;
      this.data.photo=files.src;
      console.log(this.data.photo);
    });

    reader.readAsDataURL(file);
  }

  get form()
  {
    return this.createProductForm.controls;
  }

  get colorCreateProduct()
  {
    if(this.createProductForm.valid&&this.data.photo)
      return "primary";
    return "accent";
  }

  cancel()
  {
    this.data=new Product();
  }

  createProduct(event)
  {
    event.preventDefault();
    this.isSubmitted=true;
    if(this.createProductForm.valid&&this.data.photo)
    {
      this.dataSent=true;
      if(this.data.id)
      {
        this.productService.updateProduct(this.data).subscribe(response=>{
            this.handleRequestService.showSuccess();
            this.data=new Product();
            this.productService.getProductsForAdmin().subscribe(response=>{
              this.products=response;
            });
        },err=>{
          this.handleRequestService.handleError(err);
        }).add(()=>{
          this.dataSent=false;
        });
        this.isSubmitted=false;
        return;
      }
      this.productService.createProduct(this.data).subscribe(response=>{
          this.handleRequestService.showSuccess();
          this.data=new Product();
          this.productService.getProductsForAdmin().subscribe(response=>{
            this.products=response;
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

 
  deleteProduct(id: number) {
    this.dataSent=true;
    this.productService.disableProduct(id).subscribe(response => {
      this.productService.getProductsForAdmin().subscribe(response=>{
        this.products=response;
      });
      this.handleRequestService.showSuccess();
    },err=>{
      this.handleRequestService.handleError(err);
    }).add(()=>{
      this.dataSent=false;
    });
  }

  updateProduct(id:number)
  {
    this.data=this.products.find(element=>element.id==id);
    if(this.data==null||this.data==undefined)
      this.data=new Product();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });

  }
  

  ngOnInit(): void {
    this.productService.getProductsForAdmin().subscribe(response=>{
      this.products=response;
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
