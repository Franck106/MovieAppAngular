import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";

@Component({
  selector: "app-header",
  template: `
    <header id="header">
      <div id="logo">
        <img
          src="assets/bananas.svg.png"
          alt="Cinemapp"
          i18n="@@headerLogoAlt"
          width="60"
          height="60"
        />
      </div>
      <app-menu
        [isAuthenticated]="isAuthenticated"
        [reservationsCount]="reservationsCount"
      ></app-menu>
      <div>
        <a routerLink="/admin">admin</a>
      </div>
    </header>
  `,
  styleUrls: ["./header.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isAuthenticated: boolean | null = true;
  @Input() reservationsCount: number | null = 0;
}
