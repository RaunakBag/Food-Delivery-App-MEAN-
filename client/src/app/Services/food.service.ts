import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { environment } from 'src/environments/environment';
import { Food } from '../shared/models/Food';

const Base_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  private url: string = environment.FOOD_URL + environment.production;

  getAll() {
    return this.http.get(Base_URL + 'allfood');
  }

  getFoodById(id: any) {
    return this.http.get(Base_URL + 'allfood/' + id);
  }

  addToKart(id: any) {
    return this.http.post(Base_URL + 'assignFoodToUser/' + id, {});
  }

  getCartProducts() {
    return this.http.get(Base_URL + 'userProduct');
  }

  buyAllItems() {
    return this.http.delete(Base_URL + 'buyAll');
  }
}
