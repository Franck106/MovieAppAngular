import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { Movie } from "../../services/movie";
import { CinemaService } from "../../services/cinema.service";
import { Slide } from "@ui/slideshow";

@Component({
  template: `
    <div>
      <div>
        <mat-toolbar
          ><span i18n="@@moviesStarred">Films du moment</span></mat-toolbar
        >
        <app-slideshow2
          [delay]="3000"
          *ngIf="slides$ | async as slides; else slidesLoading"
        >
          <app-slide2 *ngFor="let slide of slides" [slide]="slide"></app-slide2>
        </app-slideshow2>
        <ng-template #slidesLoading>
          <div class="center">
            <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
          </div>
        </ng-template>
      </div>
      <div>
        <mat-toolbar
          ><span i18n="@@moviesAll">Tous les films</span></mat-toolbar
        >
        <app-movies-list
          *ngIf="movies$ | async as movies; else moviesLoading"
          [movies]="movies"
        ></app-movies-list>
        <ng-template #moviesLoading>
          <div class="center">
            <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesPages implements OnInit {
  constructor(private cinema: CinemaService) {}

  movies$: Observable<Movie[]>;
  slides$: Observable<Slide[]>;

  ngOnInit(): void {
    this.movies$ = this.cinema.getMovies();
    this.slides$ = this.cinema.getSlides();
  }
}
