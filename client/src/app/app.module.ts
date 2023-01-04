import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrderComponent } from './component/order/order.component';
import { RatingModule } from 'ng-starrating';
import { SearchPipe } from './shared/search.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductContainerComponent } from './component/product-container/product-container.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { AuthInterceptor } from './Services/auth.interceptor';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
// import { AuthGuardGuard } from './auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    OrderComponent,
    SearchPipe,
    ProductContainerComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxNavbarModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
