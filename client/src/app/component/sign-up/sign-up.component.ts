import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegister } from 'src/app/shared/interfaces/iuser-register';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  firstName: String = '';
  lastName: String = '';
  email: String = '';
  password: String = '';
  confirmPassword: string = '';

  returnUrl = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ActivatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  regForm!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
    this.returnUrl = this.ActivatedRouter.snapshot.queryParams.returnUrl;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.regForm.invalid) return;
    this.authService.createUser({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  get f() {
    return this.regForm.controls;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
