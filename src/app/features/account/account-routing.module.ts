import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterPage } from "./pages/register/register.page";
import { OnlineGuard } from "@ngx-pwa/offline";
import { LoginPage } from "./pages/login/login.page";

const routes: Routes = [
  { path: "register", component: RegisterPage, canActivate: [OnlineGuard] },
  { path: "login", component: LoginPage, canActivate: [OnlineGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
