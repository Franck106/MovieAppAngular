import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaRoutingModule } from './cinema-routing.module';
import { CinemaComponent } from './cinema.component';
import { MoviesComponent } from './pages/movies/movies.component';


@NgModule({
  declarations: [CinemaComponent, MoviesComponent],
  imports: [
    CommonModule,
    CinemaRoutingModule
  ]
})
export class CinemaModule { }
