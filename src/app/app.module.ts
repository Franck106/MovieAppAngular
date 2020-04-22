import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";

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
import { environment } from "@core/environment";

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
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
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
