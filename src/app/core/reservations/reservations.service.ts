import { Injectable } from "@angular/core";
import { StoreService } from "../store/store.service";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Reservation, reservationSchema } from "./reservation";
import { mergeMap, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationsService {
  private readonly storageKey: "booking";

  constructor(private store: StoreService, private storage: StorageMap) {
    this.storage
      .get<Reservation[]>(this.storageKey, reservationSchema)
      .pipe(
        mergeMap((reservations) => this.save(reservations ?? [])),
        catchError(() => of([]))
      )
      .subscribe();
  }

  add(reservation: Reservation): Observable<undefined> {
    const reservations = [
      ...(this.store.selectSnapshot("reservations") ?? []),
      reservation,
    ];
    return this.save(reservations);
  }

  remove(reservationId: number): Observable<undefined> {
    const reservations = this.store.selectSnapshot("reservations");
    if (reservations && reservations.length >= reservationId) {
      reservations.splice(reservationId, 1);
      return this.save(reservations);
    }
    return of(undefined);
  }

  private save(reservations: Reservation[]): Observable<undefined> {
    this.store.dispatch({
      reservations,
      reservationsCount: reservations.length,
    });
    return this.storage.set(this.storageKey, reservations);
  }
}
