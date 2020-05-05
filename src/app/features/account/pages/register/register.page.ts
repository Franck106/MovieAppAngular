import { Component } from "@angular/core";
import { AccountService } from "../../services/account.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="register()" [formGroup]="form">
        <h1 i18n="@@registerTitle">Inscription</h1>
        <p i18n="@@registerWarning">
          Attention, il s'agit d'une application de test. Email et mot de passe
          seront visibles en clair par n'importe qui.
        </p>
        <app-email-with-validation [form]="form"></app-email-with-validation>
        <app-password-with-confirmation
          [form]="form"
        ></app-password-with-confirmation>
        <app-errors [errors]="errors"></app-errors>
        <div>
          <p i18n="@@registerCard">J'ai une carte :</p>
          <mat-radio-group name="card">
            <mat-radio-button value="" checked i18n="@@registerCardNo"
              >Non</mat-radio-button
            >
            <mat-radio-button value="ugc">UGC</mat-radio-button>
            <mat-radio-button value="gaumont">Gaumont</mat-radio-button>
          </mat-radio-group>
        </div>
        <mat-form-field>
          <mat-select
            name="category"
            placeholder="Genre de film préféré"
            i18n-placeholder="@@registerGenre"
          >
            <mat-option value="" i18n="@@registerGenreNone"
              >Non spécifié</mat-option
            >
            <mat-option value="action" i18n="@@registerGenreAction"
              >Action</mat-option
            >
            <mat-option value="comedy" i18n="@@registerGenreComedy"
              >Comédie</mat-option
            >
            <mat-option value="drama" i18n="@@registerGenreDrama"
              >Drame</mat-option
            >
            <mat-option value="horror" i18n="@@registerGenreHorror"
              >Horreur</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <textarea
            name="profile"
            matInput
            cdkTextareaAutosize
            placeholder="A propos de vous"
            i18n-placeholder="@@registerAboutYou"
          ></textarea>
        </mat-form-field>
        <app-city-with-autocomplete [form]="form"></app-city-with-autocomplete>
        <div>
          <mat-checkbox name="conditions" required>
            <ng-container i18n="@@registerConditions"
              >J'accepte les conditions d'utilisation</ng-container
            >. *
          </mat-checkbox>
        </div>
        <button
          type="submit"
          mat-raised-button
          color="accent"
          i18n="@@registerSubmit"
        >
          Valider l'inscription
        </button>
        <p class="center">
          <a routerLink="../login" i18n="registerExistingAccount"
            >Déjà inscrit/e? Authentifiez-vous.</a
          >
        </p>
      </form>
    </mat-card>
  `,
  styleUrls: ["./register.page.css"],
})
export class RegisterPage {
  form = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormGroup({
      password1: new FormControl("", Validators.required),
      password2: new FormControl(""),
    }),
  });
  errors: string[] = [];

  constructor(
    private account: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  register(): void {
    const loading = this.snackbar.open(
      $localize`:@@registerInProgress: Inscription en cours...`
    );
    this.account.register(this.form.value).subscribe({
      next: ({ error }) => {
        loading.dismiss();
        if (!error) {
          this.snackbar.open(
            $localize`:@@registerSuccess: Inscription réussie`,
            $localize`:@@ok: OK`,
            { duration: 2000 }
          );
          this.router.navigate(["../login"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
        } else {
          this.errors = error.errors || [error.message];
        }
      },
      error: () => {
        loading.dismiss();
        this.errors = [$localize`:@@noInternet: Pas de connexion internet.`];
      },
    });
  }
}
