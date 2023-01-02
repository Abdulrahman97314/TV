import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  loading:boolean=true
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  tvs:any=[]
  page:number=1
  more:boolean=true
  type:string="popular"
    constructor(private _ThemoviedbService:ThemoviedbService,private _ActivatedRoute:ActivatedRoute) { }
    ngOnInit(): void {
      this.getTvs()
    }
getTvs(){
  this._ThemoviedbService.getApi("tv",this.type,this.page).subscribe({
    next:(value)=> {
      this.tvs.push(...value.results)
    },
    complete:()=> {
      this.loading=false
    },
  })
}
getMore(){
  this.page++
  this.getTvs()
}
switchToTopRated () {
  if(this.type=='popular'){
    this.type='top_rated';this.page=1;this.tvs=[];this.getTvs()
  }
}
switchToPopular () {
  if(this.type=='top_rated'){
    this.type='popular';this.page=1;this.tvs=[];this.getTvs()
  }
}
}
