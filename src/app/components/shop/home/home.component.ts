import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from 'src/app/modals/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  products: Product[];
  public banners = [];
  public slides = [
    { title: 'THE BEST CHOICE IS HERE', subtitle: 'Best chiefs could make you the best pizza only.', image: 'assets/images/carousel/pizza1.jpg' },
    { title: 'Biggest discount', subtitle: 'Cheapest pizza with the most quality ever.', image: 'assets/images/carousel/pizza2.jpg' },
    { title: 'Biggest sale', subtitle: 'Other meals also.', image: 'assets/images/carousel/tacos.jpg' },

  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {


 this.productService.getProducts()
 .subscribe(
   (product: Product[]) => {
     console.log(product);
     this.products = product
   }
 )

  }






}
