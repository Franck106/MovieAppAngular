import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Theater } from "../../services/theater";

@Component({
  selector: "app-theaters-item",
  template: `
    <article *ngIf="theater">
      <mat-card>
        <mat-card-header>
          <img [src]="theater.logoSrc" [alt]="theater.title" mat-card-avatar />
          <mat-card-title>
            <a [routerLink]="['../theater', theater.id]">{{ theater.title }}</a>
          </mat-card-title>
          <mat-card-subtitle>{{ theater.address }}</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
    </article>
  `,
  styleUrls: ["./theaters-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheatersItemComponent {
  @Input() theater: Readonly<Theater> | null;
}
