import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPages } from './pages/movies/movies.pages';


const routes: Routes = [
  { path: 'movies', component: MoviesPages }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoutingModule { }
