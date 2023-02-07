import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Showtime } from '../models/showtime';

@Injectable({
  providedIn: 'root',
})
export class ShowtimesService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private API_URL = environment.API_URL + '/showtimes';

  /**
   * Obtiene todas las funciones.
   *
   * @Route GET /showtimes
   */
  getShowtimes(): Observable<Showtime[]> {
    return this.http.get<Showtime[]>(this.API_URL, this.httpOptions);
  }

  /**
   * Obtiene una función específica por su ID.
   *
   * @Route GET /showtimes/:id
   * @param id ID de la función a obtener.
   */
  getShowtime(id: string): Observable<Showtime> {
    return this.http.get<Showtime>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  getShowtimesByMovie(movieId: string): Observable<Showtime[]> {
    return this.http.get<Showtime[]>(
      `${this.API_URL}/movie/${movieId}`,
      this.httpOptions
    );
   }


  /**
   * Crea una nueva función.
   *
   * @Route POST /showtimes/create
   * @param showtime Función a crear.
   */
  createShowtime(showtime: Showtime): Observable<Showtime> {
    return this.http.post<Showtime>(
      `${this.API_URL}/create`,
      showtime,
      this.httpOptions
    );
  }

  /**
   * Actualiza una función existente.
   *
   * @Route PUT /showtimes/update/:id
   * @param id ID de la función a actualizar.
   * @param showtime Datos actualizados de la función.
   */
  updateShowtime(id: string, showtime: any): Observable<Showtime> {
    return this.http.put<Showtime>(
      `${this.API_URL}/update/${id}`,
      showtime,
      this.httpOptions
    );
  }

  /**
   * Elimina una función existente.
   *
   * @Route DELETE /showtimes/delete/:id
   * @param id ID de la función a eliminar.
   */
  deleteShowtime(id: string): Observable<Showtime> {
    return this.http.delete<Showtime>(
      `${this.API_URL}/delete/${id}`,
      this.httpOptions
    );
  }
}
