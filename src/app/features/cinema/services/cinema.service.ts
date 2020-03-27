import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { APIData } from './api-data';
import { map, pluck } from 'rxjs/operators';
import { catchOffline } from '@ngx-pwa/offline';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<APIData<Movie[]>>(`${environment.apiUrl}/api/cinema/movies`).pipe(
      pluck('data'),
      map((movies) => movies.map((movie) => ({
        ...movie,
        imgSrc: `${environment.apiUrl}${movie.imgSrc}`,
      }))),
      catchOffline(),
    );
  }

}
