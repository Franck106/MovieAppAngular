import { Component, OnInit } from "@angular/core";
import { Theater } from "../../services/theater";
import { Observable } from "rxjs";
import { CinemaService } from "../../services/cinema.service";

@Component({
  template: `
    <div>
      <app-theaters-list
        *ngIf="theaters$ | async as theaters; else loading"
        [theaters]="theaters"
      ></app-theaters-list>
    </div>
    <ng-template #loading>
      <div class="center">
        <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      </div>
    </ng-template>
  `,
  styleUrls: ["./theaters.page.css"],
})
export class TheatersPage implements OnInit {
  theaters$: Observable<Theater[]>;

  constructor(private cinema: CinemaService) {}

  ngOnInit(): void {
    this.theaters$ = this.cinema.getTheaters();
  }
}
