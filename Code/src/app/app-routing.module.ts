import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './Components/actors/actors.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MoviesComponent } from './Components/movies/movies.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { TvComponent } from './Components/tv/tv.component';
import { AuthGuard } from './Guard/auth.guard';
import { SearchComponent } from './Components/search/search.component';
import { DetailsComponent } from './Components/details/details.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "tv",canActivate:[AuthGuard], component: TvComponent },
  { path: "movies",canActivate:[AuthGuard], component: MoviesComponent },
  { path: "actors",canActivate:[AuthGuard], component: ActorsComponent },
  { path: "search",canActivate:[AuthGuard], component: SearchComponent },
  { path: "details/:media/:id",canActivate:[AuthGuard], component: DetailsComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: NotFoundComponent }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled',useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
