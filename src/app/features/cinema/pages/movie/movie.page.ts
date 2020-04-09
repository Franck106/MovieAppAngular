import { Component, OnInit } from "@angular/core";
import { CinemaService } from "../../services/cinema.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Movie } from "../../services/movie";
import { switchMap, map } from "rxjs/operators";

@Component({
  template: `
    <div>
      <div *ngIf="movie$ | async as movie; else loading">
        <app-movie-detail [movie]="movie"></app-movie-detail>
        <app-movie-schedules
          [schedulesGroups]="movie?.schedulesGroups || []"
        ></app-movie-schedules>
      </div>
      <ng-template #loading>
        <div class="center">
          <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ["./movie.page.css"],
})
export class MoviePage implements OnInit {
  movie$: Observable<Movie>;

  constructor(private cinema: CinemaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("id") || "1"),
      switchMap((id) => this.cinema.getMovie(id))
    );
  }
}
