import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  errorMsg: string = ""
  isLoading: boolean = false

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })
  sendData(loginForm: FormGroup) {
    this.isLoading = true
    this._AuthService.signIn(loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        if (res.message === "success") {
          localStorage.setItem("userToken", res.token)
          this._Router.navigate(["/home"])
          this._AuthService.saveUserData()
        }
        else {
          this.errorMsg = res.message;
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
      this._Router.navigate(["/login"])
    }

  }

}
