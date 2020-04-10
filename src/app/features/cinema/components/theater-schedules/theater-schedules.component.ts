import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Schedule } from "../../services/schedule";

@Component({
  selector: "app-theater-schedules",
  template: `
    <div id="schedules">
      <div *ngFor="let schedulesGroup of schedulesGroups">
        <app-schedules [schedules]="schedulesGroup">
          <img
            [src]="schedulesGroup[0].movie.imgSrc"
            [alt]="schedulesGroup[0].movie.title"
            mat-card-image
          />
          <p>{{ schedulesGroup[0].movie.title }}</p>
        </app-schedules>
      </div>
    </div>
  `,
  styleUrls: ["./theater-schedules.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheaterSchedulesComponent {
  @Input() schedulesGroups: ReadonlyArray<Schedule[]> | null = [];
}
