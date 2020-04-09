import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Schedule } from "../../services/schedule";

@Component({
  selector: "app-movie-schedules",
  template: `
    <div id="schedules">
      <div *ngFor="let schedulesGroup of schedulesGroups">
        <app-schedules [schedules]="schedulesGroup">
          <p>{{ schedulesGroup[0].theater.title }}</p>
        </app-schedules>
      </div>
    </div>
  `,
  styleUrls: ["./movie-schedules.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSchedulesComponent {
  @Input() schedulesGroups: ReadonlyArray<Schedule[]> | null = [];
}
