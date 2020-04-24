import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NotFoundPage } from "./pages/not-found/not-found.page";
import { OfflinePage } from "./pages/offline/offline.page";
import { UnavailablePage } from "./pages/unavailable/unavailable.page";

const routes: Routes = [
  {
    path: "oops",
    children: [
      { path: "offline", component: OfflinePage },
      { path: "unavailable", component: UnavailablePage },
      { path: "not-found", component: NotFoundPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OopsRoutingModule {}
