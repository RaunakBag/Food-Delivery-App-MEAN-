import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { FoodService } from 'src/app/Services/food.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  food!: Food;
  token:any
  disable:boolean=false
  constructor(
    public router: ActivatedRoute,
    public foodService: FoodService,
    private cartService: CartService,
    private rt: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: any) => {
      this.id = params.id;
      console.log('params from food details', this.id);
      this.foodService.getFoodById(params.id).subscribe((res: any) => {
        console.log(res);

        this.food = res.food;
        console.log('Food-Details', this.food);
      });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    console.log('Cart Service addToCart response', this.food);
    
    this.rt.navigate(['cart']);
    // this.foodService.addToKart(this.id).subscribe((res) => {
    //   console.log('Responssssssssssse', res);
    // });
  }
}
