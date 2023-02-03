import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Billboard } from '../models/billboard';

@Injectable({
  providedIn: 'root',
})
export class BillboardsService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private API_URL = environment.API_URL + '/billboards';

  /**
   * Obtiene todas las películas de la cartelera.
   *
   * @Route GET /billboards
   */
  getMovies(): Observable<Billboard[]> {
    return this.http.get<Billboard[]>(this.API_URL, this.httpOptions);
  }

  /**
   * Obtiene una película específica por su ID.
   *
   * @Route GET /billboards/:id
   * @param id ID de la película a obtener.
   */
  getMovie(id: string): Observable<Billboard> {
    return this.http.get<Billboard>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  /**
   * Crea una nueva película.
   *
   * @Route POST /movies/create
   * @param movie Película a crear.
   */
  createMovie(movie: Billboard): Observable<Billboard> {
    return this.http.post<Billboard>(
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
  updateMovie(id: string, movie: any): Observable<Billboard> {
    return this.http.put<Billboard>(
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
  deleteMovie(id: string): Observable<Billboard> {
    return this.http.delete<Billboard>(
      `${this.API_URL}/delete/${id}`,
      this.httpOptions
    );
  }
}
