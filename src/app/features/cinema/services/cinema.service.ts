import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { map, pluck } from 'rxjs/operators';
import { catchOffline } from '@ngx-pwa/offline';
import { environment } from 'src/environments/environment';
import { Slide as SlideshowSlide } from '../../../ui/slideshow2/slideshow2/models/slide';
import { Slide } from './slide';
import { APIData } from 'src/app/core/api/api-data';



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

  getSlides(): Observable<SlideshowSlide[]> {
    return this.http.get<APIData<Slide[]>>(`${environment.apiUrl}/api/cinema/slides`).pipe(
      pluck('data'),
      map((slides) => slides.map((slide) =>({
        ...slide,
        link: `../movie/${slide.movieId}`,
        imgSrc: `${environment.apiUrl}${slide.imgSrc}`,
        imgSrcFull: `${environment.apiUrl}${slide.imgSrcFull}`,
      }))),
    );
  }

}
