import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AddPage } from "./add/add.page";
import { DeletePage } from "./delete/delete.page";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [AdminComponent, AddPage, DeletePage],
  imports: [CommonModule, MatCardModule, MatToolbarModule, AdminRoutingModule],
})
export class AdminModule {}
