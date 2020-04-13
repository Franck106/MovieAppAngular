import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="login()" #loginForm="ngForm">
        <h1 i18n="@@loginTitle">Authentification</h1>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
        <mat-form-field>
          <input
            type="email"
            [(ngModel)]="form.email"
            name="email"
            matInput
            required
            autocomplete="email"
            placeholder="Adresse mail"
            i18n-placeholder="@@loginEmail"
          />
          <mat-error i18n="@@loginEmailMissing"
            >L'email est obligatoire</mat-error
          >
        </mat-form-field>
        <mat-form-field>
          <input
            type="password"
            [(ngModel)]="form.password"
            name="password"
            matInput
            required
            autocomplete="off"
            placeholder="Mot de passe"
            i18n-placeholder="@@loginPassword"
          />
          <mat-error i18n="@@loginPasswordMissing"
            >Le mot de passe est obligatoire</mat-error
          >
        </mat-form-field>
        <button
          [disabled]="loginForm.invalid"
          type="submit"
          mat-raised-button
          color="accent"
          i18n="@@loginSubmit"
        >
          S'authentifier
        </button>
        <p classe="center">
          <a routerLink="../register" i18n="@@loginNoAccount"
            >Pas encore inscrit/e? Céer un compte.</a
          >
        </p>
      </form>
    </mat-card>
  `,
  styleUrls: ["./login.page.css"],
})
export class LoginPage {
  form = {
    email: "",
    password: "",
  };
  errors: string[] = [];

  constructor(
    private account: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  login(): void {
    const loading = this.snackbar.open(
      $localize`:@@loginInProgress: Authetification en cours...`
    );
    this.account.login(this.form).subscribe({
      next: ({ error }) => {
        loading.dismiss();
        if (!error) {
          this.snackbar.open(
            $localize`:@@loginSuccess: Authetification réussie`,
            $localize`:@@ok: OK`,
            { duration: 2000 }
          );
          this.router.navigate([`../profile`], { relativeTo: this.route });
        } else {
          this.errors = error.errors || [error.message];
        }
      },
      error: () => {
        loading.dismiss();
        this.errors = [$localize`:@@noInternet: Pas de connexion internet`];
      },
    });
  }
}
