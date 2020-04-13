import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private readonly tokenKey = "access_token";
  token: string | null = null;
  isAuthenticated = new ReplaySubject<boolean>(1);

  constructor() {
    this.token = localStorage.getItem(this.tokenKey);
    this.isAuthenticated.next(this.token ? true : false);
  }

  authenticate(token: string): void {
    this.isAuthenticated.next(true);
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  deauthenticate(): void {
    this.isAuthenticated.next(false);
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
