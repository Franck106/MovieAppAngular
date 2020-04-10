import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";

import { Slideshow2Module } from "@ui/slideshow";

import { CinemaRoutingModule } from "./cinema-routing.module";
import { MoviesPages } from "./pages/movies/movies.pages";
import { MoviesListComponent } from "./components/movies-list/movies-list.component";
import { MoviesItemComponent } from "./components/movies-item/movies-item.component";
import { MoviePage } from "./pages/movie/movie.page";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MovieSchedulesComponent } from "./components/movie-schedules/movie-schedules.component";
import { SchedulesComponent } from "./components/schedules/schedules.component";
import { TheatersListComponent } from "./components/theaters-list/theaters-list.component";
import { TheatersItemComponent } from "./components/theaters-item/theaters-item.component";
import { TheatersPage } from "./pages/theaters/theaters.page";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    CinemaRoutingModule,
    Slideshow2Module,
  ],
  declarations: [
    MoviesPages,
    MoviesListComponent,
    MoviesItemComponent,
    MoviePage,
    MovieDetailComponent,
    MovieSchedulesComponent,
    SchedulesComponent,
    TheatersListComponent,
    TheatersItemComponent,
    TheatersPage,
  ],
  exports: [
    MovieDetailComponent,
    MovieSchedulesComponent,
    SchedulesComponent,
    TheatersListComponent,
    TheatersItemComponent,
  ],
})
export class CinemaModule {}
