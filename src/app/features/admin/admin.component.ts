import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  template: `
    <nav>
      <mat-toolbar color="accent">
        <a routerLink="/admin/add" routerLinkActive="nav-active">
          <ng-container>Ajouter</ng-container></a
        >
        <a routerLink="/admin/delete">
          <ng-container>Supprimer</ng-container></a
        >
      </mat-toolbar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </nav>
  `,
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
