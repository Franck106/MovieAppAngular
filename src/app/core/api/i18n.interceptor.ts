import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class I18nInterceptor implements HttpInterceptor {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request.clone({
      headers: request.headers.set('Accept-Language', this.locale),
    }));

  }

}
