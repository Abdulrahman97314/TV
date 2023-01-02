import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()item:any;
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  constructor() { }
BG:string=""
  ngOnInit(): void {
   let bg=this.item.poster_path?this.item.poster_path:this.item.profile_path?this.item.profile_path:'notFound'
   this.BG=(this.imgSrc+(bg))=='https://image.tmdb.org/t/p/w500notFound'?'assets/imgs/notFound.jpg':this.imgSrc+(bg)
  }

}
