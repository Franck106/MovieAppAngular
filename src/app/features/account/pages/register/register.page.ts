import { Component, OnInit, OnDestroy } from "@angular/core";
import { AccountService } from "../../services/account.service";
import { AutocompleteService } from "../../services/autocomplete.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl } from "@angular/forms";
import { Subscription, Observable, of } from "rxjs";
import { filter, debounceTime, switchMap, catchError } from "rxjs/operators";

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="register()" #registerForm="ngForm">
        <h1 i18n="@@registerTitle">Inscription</h1>
        <p i18n="@@registerWarning">
          Attention, il s'agit d'une application de test. Email et mot de passe
          seront visibles en clair par n'importe qui.
        </p>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
        <mat-form-field>
          <input
            type="email"
            [(ngModel)]="form.email"
            #emailControl="ngModel"
            name="email"
            matInput
            required
            autocomplete="email"
            placeholder="Adresse couriel"
            i18n-placeholder="@@registerEmail"
          />
          <p *ngIf="emailControl.invalid && emailControl.touched">
            Le couriel est obligatoire
          </p>
        </mat-form-field>
        <mat-form-field>
          <input
            type="password"
            [(ngModel)]="form.password"
            name="password"
            matInput
            required
            placeholder="Mot de passe"
            i18n-placeholder="@@registerPassword"
          />
          <mat-error></mat-error>
        </mat-form-field>
        <div>
          <p i18n="@@registerCard">J'ai une carte</p>
          <mat-radio-group>
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
            placeholder="Genre de films préférés"
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
            <mat-option value="horror" i18n="@@registerGenreHorror"
              >Horreur</mat-option
            >
            <mat-option value="drama" i18n="@@registerGenreDrama"
              >Drame</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <textarea
            name="profile"
            matInput
            cdkTextareaAutosize
            placeholder="Apropos de vous"
            i18n-placeholder="@@registerAboutYou"
          ></textarea>
        </mat-form-field>
        <mat-form-field>
          <input
            type="text"
            name="city"
            [formControl]="cityControl"
            [matAutocomplete]="cityAuto"
            matInput
            placeholder="Votre ville"
            i18n-placeholder="@@registerCity"
          />
        </mat-form-field>
        <mat-autocomplete #cityAuto>
          <mat-option
            *ngFor="let suggestion of citySuggestions"
            [value]="suggestion"
            >{{ suggestion }}</mat-option
          >
        </mat-autocomplete>
        <div>
          <mat-checkbox name="condition" required>
            <ng-container i18n="@@registerConditions"
              >J'accepte les conditions d'utilisation</ng-container
            >
          </mat-checkbox>
        </div>
        <button
          [disabled]="registerForm.invalid"
          type="submit"
          mat-raised-button
          color="accent"
          i18n="@@registerSubmit"
        >
          Valider l'inscription
        </button>
        <p class="center">
          <a routerLink="../login" i18n="registerExistingAccount"
            >Déjà inscrit/e? Authetifiez-vous.</a
          >
        </p>
      </form>
    </mat-card>
  `,
  styleUrls: ["./register.page.css"],
})
export class RegisterPage implements OnInit, OnDestroy {
  form = {
    email: "",
    password: "",
  };
  cityControl = new FormControl("");
  errors: string[] = [];
  citySuggestions: string[] = [];
  citySubscription: Subscription;

  constructor(
    private account: AccountService,
    private autocomplete: AutocompleteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.citySubscription = (this.cityControl.valueChanges as Observable<
      string
    >)
      .pipe(
        filter((value) => value.length > 2),
        debounceTime(500),
        switchMap((value) => this.autocomplete.getCitySuggestions(value)),
        catchError(() => of([]))
      )
      .subscribe((res) => {
        this.citySuggestions = res;
      });
  }

  ngOnDestroy(): void {
    this.citySubscription.unsubscribe();
  }

  register(): void {
    const loading = this.snackbar.open(
      $localize`:@@registerInProgress: Inscription en cours...`
    );
    this.account.register(this.form).subscribe({
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
