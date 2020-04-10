import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Theater } from "../../services/theater";

@Component({
  selector: "app-theaters-list",
  template: `
    <div>
      <app-theaters-item
        *ngFor="let theater of theaters"
        [theater]="theater"
      ></app-theaters-item>
    </div>
  `,
  styleUrls: ["./theaters-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheatersListComponent {
  @Input() theaters: ReadonlyArray<Theater> | null;
}
