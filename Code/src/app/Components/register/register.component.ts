import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  errorMsg: string = ""
  isLoading: boolean = false
  hide = true
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(15), Validators.required,]),
    last_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(15), Validators.required,]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    age: new FormControl(null, [Validators.min(16), Validators.max(60), Validators.required,]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(6), Validators.pattern(/^[a-z-0-9-A-Z]{0,}$/)]),
  })
  sendData(registerForm: FormGroup) {
    this.isLoading = true
    this._AuthService.SignUp(registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        if (res.message === "success") {
          this._Router.navigate(["/login"])
        }
        else {
          this.errorMsg = res.errors.email.message;
        }
      },
      error(err) {
      },
      complete() {
      },
    })
  }

  ngOnInit(): void {
    if (this._AuthService.userData.getValue() != null) {
      this._Router.navigate(["/home"])
    }
    else {
      this._Router.navigate(["/register"])
    }
  }

}
