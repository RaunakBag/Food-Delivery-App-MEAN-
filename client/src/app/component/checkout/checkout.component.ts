import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
cart!:Cart
cartItem:[]=[]
cartPrice:any=0
cartCount:any=0
  constructor(private rt: Router,private cartService:CartService) { }

  ngOnInit(): void {
    this.cart=this.cartService.getCart()
    console.log("cart from checkout", this.cart.totalCount)
    this.cartCount = this.cart.totalCount;
    this.cartPrice = this.cart.totalPrice;
    // this.cartCount = this.cart.totalCount;
  }



  toOrders() {
    this.rt.navigate(['order'])
  }
}
