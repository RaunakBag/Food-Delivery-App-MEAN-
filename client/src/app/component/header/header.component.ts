import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  DoCheck,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { FoodService } from 'src/app/Services/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  
  nav = document.querySelector('nav');
  isloggedin = false;
  token: boolean = false;
  firstName: string = '';
  cartPrice = 0;
  collapsed = true;
  // searchTerm = '';
  cartQuantity = 0;
  public searchTerm: string = '';
  darkMode$ = this.darkModeService.darkMode$;
  constructor(
    cartService: CartService,
    activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private foodService: FoodService,
    private darkModeService: DarkModeService
  ) {
    this.authService.getAuth().subscribe((data) => {
      this.token = data;
    });
    this.authService.getFirstName().subscribe((name) => {
      this.firstName = name;
    });
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartPrice = newCart.totalPrice;
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  logout() {
    this.authService.isAuthenticatedSubject.next(false);

    this.router.navigate(['']);

    console.log('logout');
  }

  drop() {
    console.log('Drop');
  }
  
  onToggle(): void {
    this.darkModeService.toggle();
  }

  scroll = (): void => {
    let scrollHeigth;

    if (window.innerWidth < 350) {
      scrollHeigth = 150;
    } else if (window.innerWidth < 500 && window.innerWidth > 350) {
      scrollHeigth = 250;
    } else if (window.innerWidth < 700 && window.innerWidth > 500) {
      scrollHeigth = 350;
    } else if (window.innerWidth < 1000 && window.innerWidth > 700) {
      scrollHeigth = 500;
    } else {
      scrollHeigth = 650;
    }

    if (window.scrollY >= scrollHeigth) {
      document.body.style.setProperty('--navbar-scroll', '#212529');
      document.body.style.setProperty('--navbar-scroll-text', '#212529');
      document.body.style.setProperty(
        '--navbar-scroll-shadow',
        '0px 6px 12px -5px #000000'
      );
    } else if (window.scrollY < scrollHeigth) {
      document.body.style.setProperty('--navbar-scroll', 'transparent');
      document.body.style.setProperty('--navbar-scroll-text', '#212529');
      document.body.style.setProperty('--navbar-scroll-shadow', 'none');
    }
  };
}
