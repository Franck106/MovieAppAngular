import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Schedule } from "../../services/schedule";
import { Router } from "@angular/router";

@Component({
  selector: "app-schedules",
  template: `
    <mat-card>
      <ng-content></ng-content>
      <mat-card-actions>
        <a
          mat-mat-raised-button
          color="accent"
          *ngFor="let schedule of schedules"
          (click)="book(schedule.id)"
          >{{ schedule.hour }}</a
        >
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ["./schedules.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesComponent {
  @Input() schedules: ReadonlyArray<Schedule> = [];
  constructor(private router: Router) {}

  book(schedule: number): void {
    this.router.navigate(["/account/profile"], {
      queryParams: { schedule },
    });
  }
}
