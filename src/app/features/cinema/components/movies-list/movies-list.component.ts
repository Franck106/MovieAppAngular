import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Movie } from '../../services/movie';

@Component({
  selector: 'app-movies-list',
  template: `
    <div id = "movies-list">
      <app-movies-item *ngFor="let movie of movies" [movie]="movie"></app-movies-item>
    </div>
  `,
  styleUrls: ['./movies-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {

  @Input() movies: ReadonlyArray<Movie> | null;

}
