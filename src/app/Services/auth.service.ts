import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem("userToken")!=null){
      this.saveUserData()
    }
   }
  userData=new BehaviorSubject(null);

  saveUserData(){
    let Coddedtoken=JSON.stringify(localStorage.getItem("userToken"));
    let decodeedToken:any=jwtDecode(Coddedtoken)
    this.userData.next(decodeedToken)
  }
  SignUp(userData:object):Observable<any>
  {
    return this._HttpClient.post('https://route-movies-api.vercel.app/signup/',userData)
  }
  signIn(userData:object):Observable<any>
  {
    return this._HttpClient.post('https://route-movies-api.vercel.app/signin/',userData)
  }
  logout(){
    localStorage.removeItem("userToken")
    this.userData.next(null)
    this._Router.navigate(["/login"])
  }
}
