import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterPage } from "./pages/register/register.page";
import { OnlineGuard } from "@ngx-pwa/offline";

const routes: Routes = [
  { path: "register", component: RegisterPage, canActivate: [OnlineGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
