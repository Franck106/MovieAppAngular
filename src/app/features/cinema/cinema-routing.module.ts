import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MoviesPages } from "./pages/movies/movies.pages";
import { MoviePage } from "./pages/movie/movie.page";
import { TheatersPage } from "./pages/theaters/theaters.page";

const routes: Routes = [
  { path: "movie/:id", component: MoviePage },
  { path: "movies", component: MoviesPages },
  { path: "theaters", component: TheatersPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule {}
