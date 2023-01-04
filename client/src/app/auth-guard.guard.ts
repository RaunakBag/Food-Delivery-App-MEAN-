import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuardGuard implements CanActivate {
  constructor(public authService:AuthService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isAuth = this.authService.getAuth()
    console.log('Auth',isAuth)
    if(!isAuth){
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
    }
    return false
  }
  
}
