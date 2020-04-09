import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Movie } from "../../services/movie";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-movie-detail",
  template: `
    <article *ngIf="movie">
      <mat-card>
        <iframe [src]="videoSrc" mat-card-image></iframe>
        <mat-card-title>{{ movie.title }}</mat-card-title>
        <mat-card-content>
          <p>
            <ng-container i18n="@@movieReleaseDate">Date de sortie</ng-container
            >: {{ movie.releasedDate | date }}
          </p>
          <p>{{ movie.summary }}</p>
        </mat-card-content>
      </mat-card>
    </article>
  `,
  styleUrls: ["./movie-detail.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent {
  @Input() movie: Readonly<Movie> | null;
  constructor(private sanitizer: DomSanitizer) {}

  get videoSrc(): SafeResourceUrl | string {
    return this.movie
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.videoSrc)
      : "";
  }
}
