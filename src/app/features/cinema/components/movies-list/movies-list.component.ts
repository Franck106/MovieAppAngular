import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TrackByFunction,
} from "@angular/core";
import { Movie } from "../../services/movie";

@Component({
  selector: "app-movies-list",
  template: `
    <div id="movies-list">
      <app-movies-item
        *ngFor="let movie of movies; trackBy: trackBy"
        [movie]="movie"
      ></app-movies-item>
    </div>
  `,
  styleUrls: ["./movies-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {
  @Input() movies: ReadonlyArray<Movie> | null;

  get trackBy(): TrackByFunction<Movie> {
    return (index, movie) => movie.id;
  }
}
