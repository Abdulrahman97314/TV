import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  imgSrc: string = "https://image.tmdb.org/t/p/w500"
  searchResults: any = []
  page: number = 1
  more: boolean = true
  media: string = "movie"
  searchText: any = ""
  totalResults:number=0
  constructor(private _ThemoviedbService: ThemoviedbService) { }
  ngOnInit(): void {
  }
  getSearch() {
    this._ThemoviedbService.getSearch(this.media, this.page, this.searchText).subscribe({
      next: (value) => {
        this.searchResults.push(...value.results)
        this.totalResults=value.total_results
      },
    })
  }
  getMore() {
    this.page++
    this.getSearch()
  }
  switchToMovies() {
    if (this.media != 'movie') {
      this.media = 'movie'; this.page = 1; this.searchResults = []; this.getSearch()
    }
  }
  switchToTv() {
    if (this.media != 'tv') {
      this.media = 'tv'; this.page = 1; this.searchResults = []; this.getSearch()
    }
  }
  switchToActors() {
    if (this.media !== 'person') {
      this.media = 'person'; this.page = 1; this.searchResults = []; this.getSearch()
    }
  }
}
