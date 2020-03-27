import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Movie } from '../../services/movie';
import { CinemaService } from '../../services/cinema.service';
import { Observable } from 'rxjs';

@Component({
  template:`
    <div>
      <div>
        <mat-toolbar><span></span></mat-toolbar>
      </div>
      <div></div>
    </div>
    <app-movies-list></app-movies-list>
    `,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MoviesPages implements OnInit {

  constructor(private cinema: CinemaService) { }

  movies$: Observable<Movie[]>;

  ngOnInit(): void {
    this.movies$ = this.cinema.getMovies();
  }

}
