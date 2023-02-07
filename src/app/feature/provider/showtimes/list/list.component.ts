import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Showtime } from 'src/app/models/showtime';
import { MoviesService } from 'src/app/services/movies.service';
import { ShowtimesService } from 'src/app/services/showtimes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ShowtimesListComponent implements OnInit {
  /**
   * Propiedad `movies` de tipo `Movie[]` que almacena la lista de películas a visualizar.
   */
  showtimes: Showtime[] = [];
  movies: Movie[] = [];
  /**
   * Constructor que inyecta una instancia de `MoviesService` para acceder a los servicios de películas.
   * @param showtimesService Instancia de `MoviesService` inyectada.
   */
  constructor(
    private showtimesService: ShowtimesService,
    private moviesService: MoviesService
  ) {}

  /**
   * Método `ngOnInit` que se ejecuta al iniciar el componente y obtiene la lista de películas.
   */
  ngOnInit(): void {
    this.getShowtimes();
    this.getMovies();
  }

  /**
   * Método `getMovies` que obtiene la lista de películas a través del servicio `moviesService`.
   */
  getShowtimes(): void {
    this.showtimesService.getShowtimes().subscribe((res: any) => {
      if (res.status === 'success') {
        this.showtimes = res.data.showtimes as Showtime[];
      }
    });
  }

  /**
   * Método `getMovies` que obtiene la lista de películas a través del servicio `moviesService`.
   */
  getMovies(): void {
    this.moviesService.getMovies().subscribe((res: any) => {
      if (res.status === 'success') {
        this.movies = res.data.movies as Movie[];
      }
    });
  }
}
