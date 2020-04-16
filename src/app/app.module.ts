import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LayoutModule } from "./ui/layout/layout.module";
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { offlineProviders } from "@ngx-pwa/offline";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HammerModule,
    AppRoutingModule,
    NoopAnimationsModule,
    LayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    offlineProviders({
      routeOffline: "/oops/offline",
      routeUnavailable: "oops/unavailable",
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
