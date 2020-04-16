import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthServiceService } from "./auth-service.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthServiceService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authReq = !this.auth.token
      ? req
      : req.clone({
          headers: req.headers.set(
            "Authorization",
            `Bearer ${this.auth.token}`
          ),
        });
    return next.handle(authReq).pipe(
      tap(
        () => {},
        (error) => {
          if (
            error instanceof HttpErrorResponse &&
            (error.status === 401 || error.status === 403)
          ) {
            this.auth.deauthenticate();
          }
        }
      )
    );
  }
}
