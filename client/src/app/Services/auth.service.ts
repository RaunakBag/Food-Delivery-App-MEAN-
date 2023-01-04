import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/iuser-login';
import { IUserRegister } from '../shared/interfaces/iuser-register';

const url = "http://localhost:3000/"
const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  private isAuthenticatedSubject$ = this.isAuthenticatedSubject.asObservable()
  userFirstNameSubject = new BehaviorSubject<string>("")
  userLastNameSubject = new BehaviorSubject<string>("")
  userEmailSubject = new BehaviorSubject<string>("")

  token: any;
  isAuthenticated: boolean = false;
  
  private userFirstNameSubject$ = this.userFirstNameSubject.asObservable();
  private userLastNameSubject$ = this.userLastNameSubject.asObservable();
  private userEmailSubject$ = this.userEmailSubject.asObservable();
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {
   
  }

  getAuth() {

    return this.isAuthenticatedSubject$;

  }

  getFirstName() {
    return this.userFirstNameSubject$;
  }
  getLastName() {
    return this.userLastNameSubject$;
  }
  getEmail() {
    return this.userEmailSubject$;
  }


  createUser(data: any) {
    this.http.post(url + "signup", data).subscribe((res: any) => {
      console.log(res)
      this.afterSignUp(res)

    })
  }

  loginUser(data: any) {
    this.http.post(url + "login", data).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.returnedToken) {
          // this.isAuthenticated = true
          this.token = res.returnedToken
          this.isAuthenticatedSubject.next(true);
          this.userFirstNameSubject.next(res.user.firstName)
          this.userLastNameSubject.next(res.user.lastName)
          this.userEmailSubject.next(res.user.email)
          this.toastrService.success(`Successfully Logged In :) ${res.user.firstName}`)
          // alert("successfully logged in")
          this.router.navigateByUrl('/')

        }


      }, error: (err) => {

        this.isAuthenticatedSubject.next(false);

        // alert("invalid")
        this.toastrService.error(`Invalid username or password :(`)
      }

    })

  }

  // createUser(userRegister:IUserRegister):Observable<User>
  // {
  //   return this.http.post<User>(url,userRegister).pipe(
  //     tap({
  //       next:(user)=>
  //       {
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //         this.toastrService.success(
  //           `Welcome to the FoodMine ${user.firstName}`,
  //           'Register Successful'
  //         )
  //       },
  //       error:(errorResponse)=>{
  //         this.toastrService.error(errorResponse.error,
  //           'Registration Failed')
  //       }
  //     })
  //   )
  // }


  // loginUser(data: any) {
  //   this.http.post(url + "login", data).subscribe((res: any) => {
  //     console.log(res)
  //     // this.afterLogin(res)
  //   })
  // }

  // loginUser(userLogin:IUserLogin):Observable<User>
  // {
  //    return this.http.post<User>(url,userLogin).pipe(
  //      tap({
  //        next: (user) =>{
  //          this.setUserToLocalStorage(user)
  //           this.userSubject.next(user);
  //           this.toastrService.success(
  //             `Welcome to FoodMine ${user.firstName}!`,
  //             `Login Successful`
  //           )


  //        },
  //        error: (errorResponse)=>{
  //              this.toastrService.error(errorResponse.error,'Login Failed');
  //        }
  //      })
  //    )
  // }

  //  afterLogin(response: any) {
  //   console.log(response);
  //   this.isAuthenticated = true;
  //   this.token = response.returnedToken;
  //   localStorage.setItem('bearer', response.token);
  //   alert("Logged In Successfully")
  //   // this.toastrService.success(
  //   //   `Welcome to the QuickMunch`,
  //   //   'Register Successful'
  //   // )
  //   this.router.navigate(['']);
  // }

  afterSignUp(response: any) {
    console.log('Token aftersignup', response);
    this.isAuthenticated = true;
    this.token = response.returnedToken;
    localStorage.setItem('bearer', response.token);

    this.toastrService.success(`Account Created Successfully ${response.user.firstName}`)
    // alert("Account Created Successfully")
    this.router.navigate(['/login']);
  }

  // //logout
  // logout()
  // {
  //   this.userSubject.next(new User());
  //   //when user was log out remove info from local storage
  //   localStorage.removeItem(USER_KEY);
  //   //for refresh the page
  //   window.location.reload();
  // }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticatedSubject$;
  }

  getAuthStatsListener() {
    return this.authStatusListener.asObservable();
  }

  // autoAuthUser() {
  //   setInterval(() => {
  //     console.log('auto called', this.getIsAuth());
  //     this.authStatusListener.next(this.getIsAuth());
  //   }, 100);


  //from usersubject  get the current user value//
  // public get currentUser(): User {
  //   return this.userSubject.value
  // }

  //we  want to when user logged in  after that the page will route to the another page
  //we get the user info from localstorage

  //setting the items to local storage
  // private setUserToLocalStorage(user: User) {
  //   localStorage.setItem(USER_KEY, JSON.stringify(user));

  // }

  //getting the items from local storage --> return the User
  // private getUserToLocalStorage(): User {
  //   //get the user json from the local storage
  //   const userJson = localStorage.getItem(USER_KEY);
  //   //if there have any user return userJson as User object  from localstorage
  //   if (userJson) return JSON.parse(userJson) as User;
  //   //else get new empty user object
  //   return new User();
  // }
  // getAuth(){
  //   return this.isAuthenticated
  // }

  // logout()
  // {
  //   console.log('logout service called');

  //   this.isAuthenticated=false;
  //   this.router.navigate([''])

  // }


}
