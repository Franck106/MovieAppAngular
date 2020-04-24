import { Component, OnInit } from "@angular/core";

@Component({
  template: `
    <mat-card>
      <mat-card-title>Ajout</mat-card-title>
      <mat-card-content>
        <p>
          <a routerLink="/admin">retour...</a>
        </p>
        <p>
          <a routerLink="/admin/delete">Supprimer</a>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./add.page.css"],
})
export class AddPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
