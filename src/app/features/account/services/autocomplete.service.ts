import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIData } from "@core/api";
import { environment } from "@core/environment";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  getCitySuggestions(value: string): Observable<string[]> {
    return this.http
      .get<APIData<string[]>>(`${environment.apiUrl}/api/autocomplete/${value}`)
      .pipe(
        map((response) => response.data),
        catchError(() => [])
      );
  }
}
