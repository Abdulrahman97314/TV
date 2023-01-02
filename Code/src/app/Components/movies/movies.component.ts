import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  movies:any=[]
  page:number=1
  more:boolean=true
  type:string="popular"
  loading: boolean=true;
    constructor(private _ThemoviedbService:ThemoviedbService) { }
    ngOnInit(): void {    
      Aos.init()
      this.getMovies()
    }
getMovies(){
  this._ThemoviedbService.getApi("movie",this.type,this.page).subscribe({
    next:(value)=> {
      this.movies.push(...value.results)
    },complete: () => {
      this.loading = false
    },
  })
}
getMore(){
  this.page++
  this.getMovies()
}
switchToTopRated () {
  if(this.type=='popular'){
    this.type='top_rated';this.page=1;this.movies=[];this.getMovies()
  }
}
switchToPopular () {
  if(this.type=='top_rated'){
    this.type='popular';this.page=1;this.movies=[];this.getMovies()
  }
}
}
