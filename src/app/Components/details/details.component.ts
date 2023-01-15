import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  details: any = ""
  loading: boolean = true
  videos: any = ""
  credits: any = ""
  similar: any = ""
  media: any = ""
  id: any = 0
  youtube: string = "https://www.youtube.com/embed/"
  imgSrcBg: string = "https://image.tmdb.org/t/p/original"
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  tvCredits: any = ""
  constructor(private _ThemoviedbService: ThemoviedbService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id')
      this.media = params.get('media')
      this.videos = ""
      this.getDetails(this.media, this.id)
    })
  }
  getDetails(media: string, id: number) {
    this._ThemoviedbService.getDetails(media, id).subscribe({
      next: (value) => {        
        this.details = value
        if(media!='person'){
          this.getCredits(media, id)
          this.getSimilar(media, id)
          this.getVideos(media, id)
        }
        else{
          this.getCredits(media, id)
          this.getTvCredits(media, id)
        }
      },
      complete: () => {
        this.loading = false
      },
    })
  }
  getCredits(media: string, id: number) {
    this._ThemoviedbService.getCreditsAndVideosandSimilar(media, id, 'credits').subscribe({
      next: (value) => {
        this.credits = value.cast

      },
    })
  }

  getVideos(media: string, id: number) {
    this._ThemoviedbService.getCreditsAndVideosandSimilar(media, id, "videos").subscribe({
      next: (value) => {
        this.videos = value.results
      },
    })
  }
  getSimilar(media: string, id: number) {
    this._ThemoviedbService.getCreditsAndVideosandSimilar(media, id, "similar").subscribe({
      next: (value) => {
        this.similar = value.results.filter((item:any) => item.poster_path).slice(0, 10)

      },
    })
  }
  getTvCredits(media: string, id: number) {
    this._ThemoviedbService.getCreditsAndVideosandSimilar(media, id, "tv_credits").subscribe({
      next: (value) => {
        this.tvCredits = value.cast?.filter((item: any) => item.poster_path)
      },
    })
  }
}
