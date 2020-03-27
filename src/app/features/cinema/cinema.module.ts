import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';


import { CinemaRoutingModule } from './cinema-routing.module';
import { MoviesPages } from './pages/movies/movies.pages';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesItemComponent } from './components/movies-item/movies-item.component';


@NgModule({
  declarations: [MoviesPages, MoviesListComponent, MoviesItemComponent],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    CommonModule,
    CinemaRoutingModule
  ],
  exports: [MoviesListComponent, MoviesItemComponent]
})
export class CinemaModule { }
