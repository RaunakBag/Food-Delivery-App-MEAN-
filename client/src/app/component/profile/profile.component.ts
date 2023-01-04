import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  token: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  constructor(public authService: AuthService, private router: Router) {
    this.authService.getAuth().subscribe((data) => {
      this.token = data;
    });
    this.authService.getFirstName().subscribe((fname) => {
      this.firstName = fname;
    });
    this.authService.getLastName().subscribe((lname) => {
      this.lastName = lname;
    });
    this.authService.getEmail().subscribe((email) => {
      this.email = email;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.isAuthenticatedSubject.next(false);
    this.router.navigate(['']);
    console.log('logout');
  }
}
