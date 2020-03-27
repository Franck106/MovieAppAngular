import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Movie } from '../../services/movie';

@Component({
  selector: 'app-movies-item',
  template: `
    <article>
    <mat-card>
        <a [routerLink]="['../movie', movie.id]"><img [src]="movie.imgSrc" [alt]="movie.title" mat-card-image loading="lazy"></a>
        <mat-card-title><a [routerLink]="['../movie', movie.id]">{{ movie.title }}</a></mat-card-title>
      </mat-card>
    </article>
  `,
  styleUrls: ['./movies-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesItemComponent {

  @Input() movie: Readonly<Movie>;

}
