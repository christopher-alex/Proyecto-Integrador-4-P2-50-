import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../../services/movies.service';
import { Movie } from '../../../../models/movie';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
/**
 * Clase `MoviesListComponent` que representa la lógica de visualización de una lista de películas.
 * Implementa la interfaz `OnInit` para ejecutar código al iniciar el componente.
 */
export class MoviesListComponent implements OnInit {
  /**
   * Propiedad `movies` de tipo `Movie[]` que almacena la lista de películas a visualizar.
   */
  movies: Movie[] = [];

  /**
   * Constructor que inyecta una instancia de `MoviesService` para acceder a los servicios de películas.
   * @param moviesService Instancia de `MoviesService` inyectada.
   */
  constructor(private moviesService: MoviesService) {}

  /**
   * Método `ngOnInit` que se ejecuta al iniciar el componente y obtiene la lista de películas.
   */
  ngOnInit(): void {
    this.getMovies();
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

  /**
   * Método `getMovieByTitle` que obtiene una película por su título a través del servicio `moviesService`.
   * @param title Título de la película a buscar.
   */
  getMovieByTitle(title: string): void {
    if (title === '') {
      this.getMovies();
      return;
    }
    this.moviesService.getMovieByTitle(title).subscribe((res: any) => {
      if (res.status === 'success') {
        this.movies = res.data.movies as Movie[];
      }
    });
  }
}
