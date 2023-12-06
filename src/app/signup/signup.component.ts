import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidEmail: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
    });
  }   

  get f() {
    return this.signupForm.controls;
  }

  submit(): void {
    console.log(this.signupForm.value);

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      alert("Password and Confirm Password must be the same!");
    } else {
      const apiURL = 'https://localhost:7069/api/Registrations';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.httpClient.post(apiURL, this.signupForm.value, httpOptions)
        .subscribe(
          (res: any) => {
            alert("Registered successfully!!");
            console.log('Account signed up successfully!');
            this.router.navigateByUrl('login');
          },
          (error: any) => {
            console.error('Error during user registration:', error);
          }
        );
    }
  }
}
