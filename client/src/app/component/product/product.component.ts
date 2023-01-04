import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/Services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  foods: Food[] = [];
  foodItem: any = [];
  searchTerm = '';

  id: any;
  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodService.getAll().subscribe((res: any) => {
      console.log(res);
      this.foodItem = res.foods;
    });
  }

  searchValue: string = '';
  @Output()
  searchText: EventEmitter<string> = new EventEmitter<string>();

  searchItem(value: string) {
    this.searchValue = value;
    console.log('Search Value', this.searchValue);
  }

  searchFoods() {
    this.searchText.emit(this.searchValue);
  }

  searchFoodItem() {
    this.searchText.emit(this.searchValue);
  }
}
