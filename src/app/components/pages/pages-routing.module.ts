import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OrderComponent } from './order/order.component';
import { OrderElementComponent } from './order-element/order-element.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryElementComponent } from './delivery-element/delivery-element.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCouponComponent } from './manage-coupon/manage-coupon.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order/:id', component: OrderElementComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'delivery/:id', component: DeliveryElementComponent },
      { path:'create-user' , component:CreateUserComponent},
      { path:'manage-users', component:ManageUsersComponent},
      { path:'manage-products', component:ManageProductComponent},
      { path:'manage-coupons', component:ManageCouponComponent},
      { path:'manage-orders', component:ManageOrderComponent},
      { path:'manage-order/:id', component:OrderAdminComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
