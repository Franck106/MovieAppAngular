import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReservationsService, Reservation } from "@core/reservations";
import { APIData } from "@core/api";
import { Observable } from "rxjs";
import { environment } from "@core/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  constructor(
    private http: HttpClient,
    private reservations: ReservationsService
  ) {}

  book(scheduleId: string | number): Observable<APIData<Reservation>> {
    const schedule = {
      schedule:
        typeof scheduleId === "number"
          ? scheduleId
          : Number.parseInt(scheduleId, 10),
    };
    return this.http
      .post<APIData<Reservation>>(`${environment.apiUrl}/api/book`, schedule)
      .pipe(
        tap(({ data, error }) => {
          if (!error) {
            this.reservations.add(data).subscribe();
          }
        })
      );
  }

  unbook(id: number): void {
    this.reservations.remove(id).subscribe();
  }
}
