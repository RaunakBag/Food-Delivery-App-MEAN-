import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { LoginComponent } from './component/login/login.component';
import { OrderComponent } from './component/order/order.component';
import { ProductContainerComponent } from './component/product-container/product-container.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductComponent } from './component/product/product.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'cart',
    component: CartComponent
  },
  // {
  //   path: 'product',
  //   component: ProductComponent
  // },
  {
    path: 'product',
    component: ProductContainerComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'detail/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  // {
  //   path: 'product/search/:searchTerm',
  //   component: ProductComponent
  // }
  // {
  //   path: 'cart',
  //   component: CartComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'products',
  //   component: ProductContainerComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ProductsComponent,
  //     },
  //     {
  //       path: 'detail/:id',
  //       component: ProductDetailComponent,
  //     },
  //   ],
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
