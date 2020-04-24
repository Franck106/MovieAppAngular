import { Component, OnInit } from "@angular/core";

@Component({
  template: `
    <mat-card>
      <mat-card-title>Suppression</mat-card-title>
      <mat-card-content>
        <p>
          <a routerLink="/admin">retour...</a>
        </p>
        <p>
          <a routerLink="/admin/add">Ajouter</a>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./delete.page.css"],
})
export class DeletePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
