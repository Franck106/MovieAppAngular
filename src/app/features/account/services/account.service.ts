import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthServiceService } from "src/app/core/auth/auth-service.service";
import { Observable, scheduled, asyncScheduler, of } from "rxjs";
import { APIData } from "@core/api";
import { environment } from "@core/environment";
import { tap, map } from "rxjs/operators";
import { Token } from "./token";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  login(body: { email: string; password: string }): Observable<APIData<Token>> {
    return this.http
      .post<APIData<Token>>(`${environment.apiUrl}/api/account/login`, body)
      .pipe(
        tap(({ data, error }) => {
          if (!error) {
            this.auth.authenticate(data.token);
          }
        })
      );
  }

  logout(): Observable<boolean> {
    return scheduled(of(true), asyncScheduler).pipe(
      tap(() => {
        this.auth.deauthenticate();
      })
    );
  }

  register(body: {
    email: string;
    password: string | { paswword1: string; password2: string };
  }): Observable<APIData<boolean>> {
    return this.http.post<APIData<boolean>>(
      `${environment.apiUrl}/api/account/register`,
      body
    );
  }

  isAvailable(email: string): Observable<boolean> {
    return this.http
      .get<APIData<boolean>>(
        `${environment.apiUrl}/api/account/available${email}`
      )
      .pipe(map((response) => !response.error));
  }
}
