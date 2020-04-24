import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OopsRoutingModule } from "./oops-routing.module";
import { UnavailablePage } from "./pages/unavailable/unavailable.page";
import { NotFoundPage } from "./pages/not-found/not-found.page";
import { OfflinePage } from "./pages/offline/offline.page";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [UnavailablePage, NotFoundPage, OfflinePage],
  imports: [CommonModule, MatCardModule, OopsRoutingModule],
})
export class OopsModule {}
