import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cinema } from '../models/cinema';

@Injectable({
  providedIn: 'root',
})
export class CinemasService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private API_URL = environment.API_URL + '/cinemas';

  /**
   * Obtiene todos los escenarios.
   *
   * @Route GET /cinemas
   */
  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.API_URL, this.httpOptions);
  }

  /**
   * Obtiene un escenario específica por su ID.
   *
   * @Route GET /cinemas/:id
   * @param id ID del escenario a obtener.
   */
  getCinema(id: string): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  /**
   * Crea un nuevo escenario.
   *
   * @Route POST /cinemas/create
   * @param cinema Escenario a crear.
   */
  createCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(
      `${this.API_URL}/create`,
      cinema,
      this.httpOptions
    );
  }

  /**
   * Actualiza un escenario existente.
   *
   * @Route PUT /cinemas/update/:id
   * @param id ID del escenario a actualizar.
   * @param cinema Datos actualizados del escenario.
   */
  updateCinema(id: string, cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(
      `${this.API_URL}/update/${id}`,
      cinema,
      this.httpOptions
    );
  }

  /**
   * Elimina un escenario existente.
   *
   * @Route DELETE /cinemas/delete/:id
   * @param id ID del escenario a eliminar.
   */
  deleteCinema(id: string): Observable<Cinema> {
    return this.http.delete<Cinema>(
      `${this.API_URL}/delete/${id}`,
      this.httpOptions
    );
  }
}
