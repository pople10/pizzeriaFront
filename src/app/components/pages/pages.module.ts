import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogModule } from '../blog/blog.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AgmCoreModule } from '@agm/core';
import { MatNativeDateModule } from '@angular/material/core';
import { OrderComponent } from './order/order.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {DataTablesModule} from 'angular-datatables';
import { OrderElementComponent } from './order-element/order-element.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryElementComponent } from './delivery-element/delivery-element.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCouponComponent } from './manage-coupon/manage-coupon.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    BlogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPM6HA96FiWhoVieMmF0T-segiya5Ytf8'
    }),          
    MatDatepickerModule,      
    MatNativeDateModule,        
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    DataTablesModule,
    MatGridListModule
  ],
  declarations: [
    CartComponent,
    ContactComponent,
    WishlistComponent,
    CheckoutComponent,
    MyAccountComponent,
    FaqComponent,
    AboutUsComponent,
    ErrorPageComponent,
    OrderComponent,
    OrderElementComponent,
    DeliveryComponent,
    DeliveryElementComponent,
    CreateUserComponent,
    ManageUsersComponent,
    ManageProductComponent,
    ManageCouponComponent,
    ManageOrderComponent,
    OrderAdminComponent

  ]
})
export class PagesModule { }
