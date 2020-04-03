import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";

@Component({
  selector: "app-menu",
  template: `
    <mat-toolbar color="primary">
      <a routeLink="/cinema/movies" routerLinkActive="nav-active">
        <mat-icon>movie</mat-icon>
        <ng-container i18n="@@menuMovies">Films</ng-container>
      </a>
      <a routeLink="/cinema/theaters" routerLinkActive="nav-active">
        <mat-icon>theaters</mat-icon>
        <ng-container i18n="@@menuTheaters">Cinemas</ng-container>
      </a>
      <a
        *ngIf="isAuthenticated"
        routeLink="/account/profile"
        routerLinkActive="nav-active"
      >
        <mat-icon
          [matBadge]="reservationsCountBadge"
          matBadgePosition="above before"
          matBadgeColor="accent"
          matBadgeSize="small"
          >event</mat-icon
        >
        <ng-container i18n="@@menuReservations">Mes résas</ng-container>
      </a>
      <a
        *ngIf="!isAuthenticated"
        routeLink="/account/login"
        routerLinkActive="nav-active"
      >
        <mat-icon>account_circle</mat-icon>
        <ng-container i18n="@@menuAccount">Compte</ng-container>
      </a>
    </mat-toolbar>
  `,
  styleUrls: ["./menu.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() isAuthenticated: boolean | null = true;
  @Input() reservationsCount: number | null = 0;

  get reservationsCountBadge(): string | undefined {
    return this.reservationsCount
      ? this.reservationsCount.toString()
      : undefined;
  }
}
