import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { FoodService } from 'src/app/Services/food.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userProducts: any = [];

  cart!: Cart;

  disable: boolean = false;
  token: any = '';
  firstName: string = '';
  lastName: string = '';
  value: string = '';
  constructor(
    private router: Router,
    private foodService: FoodService,
    private cartService: CartService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log('cart component constructor', this.cart);
      console.log('Cart Items for checkout', cart.items);
    });
  }

  ngOnInit(): void {
    this.authService.getFirstName().subscribe((fname) => {
      this.firstName = fname;
    });
    this.authService.getLastName().subscribe((lname) => {
      this.lastName = lname;
    });
  }

  removeFromCart(cartItem: CartItem) {
    console.log('From removeFromCart', cartItem.food.id);
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);

    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

  toShop() {
    this.router.navigateByUrl('/product');
  }

  buyProducts() {
    //   this.token = this.authService.getAuth()
    //   console.log('TTTTTTTTTTTTTTTTTTTT', this.token);
    //   // this.cartService.clearCart()
    //   // this.router.navigateByUrl('order')
    //   // this.toastrService.success(`Order Placed Successfully`)
    //   if (this.token === false)
    //     this.router.navigateByUrl('login')
    //   else {
    //     this.cartService.clearCart()
    //     this.router.navigateByUrl('order')
    //     this.toastrService.success(`Order Placed Successfully`)
    //   }
    //   // this.cartService.clearCart()
    //   //   this.router.navigateByUrl('order')
    //   //   this.toastrService.success(`Order Placed Successfully`)
    this.authService.getAuth().subscribe((res) => {
      this.token = res;
    });

    console.log('final token', this.token);

    if (this.token === true) {
      this.router.navigateByUrl('/order');
      this.cartService.clearCart()
      this.router.navigateByUrl('order')
      this.toastrService.success(`Order Placed Successfully`)

    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
