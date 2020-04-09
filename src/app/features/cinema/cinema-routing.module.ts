import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MoviesPages } from "./pages/movies/movies.pages";
import { MoviePage } from "./pages/movie/movie.page";

const routes: Routes = [
  { path: "movie/:id", component: MoviePage },
  { path: "movies", component: MoviesPages },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule {}
