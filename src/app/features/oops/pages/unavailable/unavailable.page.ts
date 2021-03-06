import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  template: `
    <mat-card>
      <mat-card-title i18n="@@unavailableTitle"
        >Service inaccessible</mat-card-title
      >
      <mat-card-content>
        <p i18n="@@unavailableMessage">
          Cette page nécessite une connexion internet<./p>
        </p>
        <p *ngIf="isAuthenticated">
          <a routerLink="/account/profile" i18n="@@unavailableReservations"
            >Accéder à vos réservations</a
          >
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./unavailable.page.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnavailablePage {
  isAuthenticated = false;
  constructor() {}
}
