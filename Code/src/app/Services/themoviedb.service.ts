import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {

  constructor(private _HttpClient:HttpClient) { }
  getApi(media:string,type:string,page:number): Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${media}/${type}?api_key=aec7bb4a2db0bd328399c2bb3fe500a7&language=en-US&page=${page}`)
  }
  getSearch(media:string,page:number,text:string): Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/${media}?api_key=aec7bb4a2db0bd328399c2bb3fe500a7&language=en-US&page=${page}&include_adult=false&query=${text}`)
  }
  getDetails(media: string, id: number): Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=aec7bb4a2db0bd328399c2bb3fe500a7&language=en-US`)
  }
  getCreditsAndVideosandSimilar(media: string, id: number,type:string): Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${media}/${id}/${type}?api_key=aec7bb4a2db0bd328399c2bb3fe500a7&language=en-US`)
  }
}
