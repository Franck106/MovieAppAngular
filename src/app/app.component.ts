import { Component, OnInit } from "@angular/core";
import { Network } from "@ngx-pwa/offline";
import { Observable } from "rxjs";
import { AuthServiceService } from "./core/auth/auth-service.service";
import { StoreService } from "./core/store/store.service";

@Component({
  selector: "app-root",
  template: `
    <div>
      <app-header
        [isAuthenticated]="isAuthenticated$ | async"
        [reservationsCount]="reservationsCount$ | async"
      ></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  reservationsCount$: Observable<number>;

  constructor(
    protected network: Network,
    private auth: AuthServiceService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated;
    this.reservationsCount$ = this.store.select("reservationsCount");
  }
}
