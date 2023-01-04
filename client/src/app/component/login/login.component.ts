import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private activaedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.authService.loginUser({ email: this.email, password: this.password });
  }
}
