import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "./movie";
import { map, pluck, groupBy } from "rxjs/operators";
import { catchOffline } from "@ngx-pwa/offline";
import { environment } from "src/environments/environment";
import { Slide as SlideshowSlide } from "../../../ui/slideshow2/slideshow2/models/slide";
import { Slide } from "./slide";
import { APIData } from "src/app/core/api/api-data";
import { Theater } from "./theater";

@Injectable({
  providedIn: "root",
})
export class CinemaService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<APIData<Movie[]>>(`${environment.apiUrl}/api/cinema/movies`)
      .pipe(
        pluck("data"),
        map((movies) =>
          movies.map((movie) => ({
            ...movie,
            imgSrc: `${environment.apiUrl}${movie.imgSrc}`,
          }))
        ),
        catchOffline()
      );
  }

  getTheaters(): Observable<Theater[]> {
    return this.http
      .get<APIData<Theater[]>>(`${environment.apiUrl}/api/cinema/theaters`)
      .pipe(
        pluck("data"),
        map((theaters) =>
          theaters.map((theater) => ({
            ...theater,
            logoSrc: `${environment.apiUrl}${theater.logoSrc}`,
          }))
        ),
        catchOffline()
      );
  }

  getSlides(): Observable<SlideshowSlide[]> {
    return this.http
      .get<APIData<Slide[]>>(`${environment.apiUrl}/api/cinema/slides`)
      .pipe(
        pluck("data"),
        map((slides) =>
          slides.map((slide) => ({
            ...slide,
            link: `../movie/${slide.movieId}`,
            imgSrc: `${environment.apiUrl}${slide.imgSrc}`,
            imgSrcFull: `${environment.apiUrl}${slide.imgSrcFull}`,
          }))
        )
      );
  }

  getMovie(id: string | number): Observable<Movie> {
    return this.http
      .get<APIData<Movie>>(`${environment.apiUrl}/api/cinema/movie/${id}`)
      .pipe(
        pluck("data"),
        map((movie) => ({
          ...movie,
          imgSrc: `${environment.apiUrl}${movie.imgSrc}`,
        })),
        map(this.groupSchedules("theater")),
        catchOffline()
      );
  }

  private groupSchedules(groupBy: "movie"): (theater: Theater) => Theater;
  private groupSchedules(groupBy: "theater"): (movie: Movie) => Movie;
  private groupSchedules<T extends Movie | Theater>(
    groupBy: "movie" | "theater"
  ): (movieOrTheater: T) => T {
    return (movieOrTheater: T) => {
      const rawSchedules = movieOrTheater.schedules || [];

      const schedulesGroups = Array.from(
        new Set<number>(rawSchedules.map((schedule) => schedule[groupBy].id))
      ).map((id) =>
        rawSchedules.filter((schedule) => schedule[groupBy].id === id)
      );
      return Object.assign({}, movieOrTheater, { schedulesGroups });
    };
  }
}
