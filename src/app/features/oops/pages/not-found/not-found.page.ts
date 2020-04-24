import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  template: `
    <mat-card>
      <mat-card-title i18n="@@notFoundTitle">
        Page introuvable
      </mat-card-title>
      <mat-card-content>
        <p i18n="@@notFoundMessage">La page que vous cherchez n'existe pas</p>
        <p>
          <a routerLink="/" i18n="@@notBackToHome"
            >Revenir à la page d'accueil</a
          >
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./not-found.page.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
