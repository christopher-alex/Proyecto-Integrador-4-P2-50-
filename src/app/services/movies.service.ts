import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private API_URL = environment.API_URL + '/movies';

  /**
   * Obtiene todas las películas.
   *
   * @Route GET /movies
   */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.API_URL, this.httpOptions);
  }

  /**
   * Obtiene una película específica por su ID.
   *
   * @Route GET /movies/:id
   * @param id ID de la película a obtener.
   */
  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  /**
   * Obtiene una película específica por su título.
   *
   * @Route GET /movies/search/:title
   * @param title Título de la película a obtener.
   *
   */
  getMovieByTitle(title: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.API_URL}/search/${title}`,
      this.httpOptions
    );
  }

  /**
   * Crea una nueva película.
   *
   * @Route POST /movies/create
   * @param movie Película a crear.
   */
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(
      `${this.API_URL}/create`,
      movie,
      this.httpOptions
    );
  }

  /**
   * Actualiza una película existente.
   *
   * @Route PUT /movies/update/:id
   * @param id ID de la película a actualizar.
   * @param movie Datos actualizados de la película.
   */
  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(
      `${this.API_URL}/update/${id}`,
      movie,
      this.httpOptions
    );
  }

  /**
   * Elimina una película existente.
   *
   * @Route DELETE /movies/delete/:id
   * @param id ID de la película a eliminar.
   */
  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(
      `${this.API_URL}/delete/${id}`,
      this.httpOptions
    );
  }
}
