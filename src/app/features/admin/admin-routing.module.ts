import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AddPage } from "./add/add.page";
import { DeletePage } from "./delete/delete.page";

const routes: Routes = [
  { path: "", component: AdminComponent },
  { path: "add", component: AddPage },
  { path: "delete", component: DeletePage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
