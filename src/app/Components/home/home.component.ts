import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import * as AOS from 'aos';
SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading:boolean=true
  popularMovies:any=""
  tvs:any=""
  people:any=""
  imgSrcBg: string = "https://image.tmdb.org/t/p/original"
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  constructor(private _ThemoviedbService:ThemoviedbService) { }
  swiperConfig:any = {
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        slidesPerView: 2.5,
        spaceBetween: 0
      },
      480: {
        slidesPerView: 2.5,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 0
      },
      1024: {
        slidesPerView: 4.25,
        spaceBetween: 0
      },
      1280: {
        slidesPerView: 6.5,
        spaceBetween: 0
      },
    }
  }
  ngOnInit(): void {
    AOS.init()
    this.getPopularMovies()
    this.getPopularTv()
    this.getPopularPeople()
  }
  getPopularMovies(){
    this._ThemoviedbService.getApi("movie","popular",1).subscribe({
      next:value=> {
        this.popularMovies=value.results
      },
      complete:()=> {
        this.loading=false
      },
    })

  }
  getPopularTv(){
    this._ThemoviedbService.getApi("tv","popular",1).subscribe({
      next:value=> {
        this.tvs=value.results
      },
    })
  }
  getPopularPeople(){
    this._ThemoviedbService.getApi("person","popular",1).subscribe({
      next:value=> {
        this.people=value.results
      },
    })
  }
}
