import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterPage } from "./pages/register/register.page";
import { OnlineGuard } from "@ngx-pwa/offline";
import { LoginPage } from "./pages/login/login.page";
import { ProfilePage } from "./pages/profile/profile.page";
import { AuthGuard } from "src/app/core/auth/auth-guard.guard";
import { LogoutPage } from "./pages/logout/logout.page";

const routes: Routes = [
  { path: "register", component: RegisterPage, canActivate: [OnlineGuard] },
  { path: "login", component: LoginPage, canActivate: [OnlineGuard] },
  { path: "logout", component: LogoutPage },
  { path: "profile", component: ProfilePage, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
