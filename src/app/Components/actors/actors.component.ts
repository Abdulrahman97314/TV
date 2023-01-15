import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {
  loading:boolean=true
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  actors:any=[]
  page:number=1
  more:boolean=true
  type:string="popular"
    constructor(private _ThemoviedbService:ThemoviedbService) { }
    ngOnInit(): void {
      this.getMovies()
    }
getMovies(){
  this._ThemoviedbService.getApi("person",this.type,this.page).subscribe({
    next:(value)=> {
      this.actors.push(...value.results)
    },
    complete:()=> {
      this.loading=false
    },
  })
}
getMore(){
  this.page++
  this.getMovies()
}

}
