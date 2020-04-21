import { Component, OnInit } from "@angular/core";
import { StoreService } from "@core/store";
import { BookingService } from "../../services/booking.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Reservation } from "@core/reservations";

@Component({
  template: `
    <mat-card>
      <h1 i18n="@@profileTitle">Profil</h1>
      <div *ngIf="reservations$ | async as reservations">
        <p i18n="@@profileReservationNumber">
          {reservations.length, plural, =0 {Vous n'avez pas de réservation} =1
          {Vous avez une réservation} other {Vous avez
          {{ reservations.length }} réservations}}.
        </p>
        <div *ngFor="let reservation of reservations; index as i">
          <ul>
            <li>
              <ng-container i18n="@@profileMovie">Film</ng-container> :
              {{ reservation.movieTitle }}
            </li>
            <li>
              <ng-container i18n="@@profileTheater">Cinéma</ng-container> :
              {{ reservation.theaterTitle }}
            </li>
            <li>
              <ng-container i18n="@@profileSchedule">Séance</ng-container> :
              {{ reservation.scheduleHour }}
            </li>
          </ul>
          <p>
            <a (click)="cancel(i)" i18n="@@profileCancel"
              >Annuler cette réservation</a
            >
          </p>
        </div>
      </div>
      <p *ngIf="bookingProgress" i18n="@@profileInProgress">
        Réservation en cours...
      </p>
      <p>
        <a routerLink="../logout" i18n="@@profileLogout">Se désauthentifier</a>
      </p>
    </mat-card>
  `,
  styleUrls: ["./profile.page.css"],
})
export class ProfilePage implements OnInit {
  reservations$: Observable<Reservation[]>;
  bookingProgress = false;
  constructor(
    private store: StoreService,
    private booking: BookingService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reservations$ = this.store.select("reservations");
    const schedule = this.route.snapshot.queryParamMap.get("schedule");
    if (schedule) {
      this.bookingProgress = true;
      this.booking.book(schedule).subscribe({
        next: ({ error }) => {
          this.bookingProgress = false;
          if (!error) {
            this.snackBar.open(
              $localize`:@@bookingSuccess: Réservation confirmée`,
              `OK`,
              { duration: 2000 }
            );
          }
        },
        error: () => {
          this.bookingProgress = false;
          this.snackBar.open(
            $localize`:@@bookingError:Echec de la réservation (pas de connexion internet)`,
            $localize`:@@ok:OK`,
            { duration: 2000 }
          );
        },
      });
    }
  }

  cancel(id: number): void {
    this.booking.unbook(id);
  }
}
