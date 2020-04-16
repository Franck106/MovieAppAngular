import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthServiceService } from "./auth-service.service";
import { Observable } from "rxjs";
import { map, first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.isAuthenticated.pipe(
      map(
        (isAuthenticated) =>
          isAuthenticated || this.route.parseUrl("/acount/login")
      ),
      first()
    );
  }
}
