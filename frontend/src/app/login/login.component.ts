import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  message: any;
  userId: any;


  constructor(private formBuilder: FormBuilder,
    private apiservice: ServicesService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userid')
    if (this.userId) {
      this.router.navigate(['products']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };

    this.apiservice.login(loginData).subscribe((data: any) => {
      this.message = data.message;

      if (data.data.userId) {

        window.localStorage.setItem('userid', data.data.userId)
        this.router.navigate(['products']);
      } else {
        this.invalidLogin = true;
      }
    })

  }

}
