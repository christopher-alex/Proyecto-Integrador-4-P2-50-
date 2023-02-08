import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private API_URL = environment.API_URL + '/tickets';

  /**
   * Obtiene todos los tickets
   *
   * @Route GET /tickets
   */
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.API_URL, this.httpOptions);
  }

  /**
   * Obtiene un ticket específica por su ID.
   *
   * @Route GET /tickets/:id
   * @param id ID del tickets a obtener.
   */
  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  getTicketsByType(type: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      `${this.API_URL}/type/${type}`,
      this.httpOptions
    );
  }

  /**
   * Crea un nuevo ticket.
   *
   * @Route POST /tickets/create
   * @param ticket Ticket a crear.
   */
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      `${this.API_URL}/create`,
      ticket,
      this.httpOptions
    );
  }

  /**
   * Actualiza un ticket existente.
   *
   * @Route PUT /tickets/update/:id
   * @param id ID del ticket a actualizar.
   * @param ticket Datos actualizados del ticket.
   */
  updateTicket(id: string, ticket: any): Observable<Ticket> {
    return this.http.put<Ticket>(
      `${this.API_URL}/update/${id}`,
      ticket,
      this.httpOptions
    );
  }

  /**
   * Elimina un ticket existente.
   *
   * @Route DELETE /tickets/delete/:id
   * @param id ID del ticket a eliminar.
   */
  deleteTicket(id: string): Observable<Ticket> {
    return this.http.delete<Ticket>(
      `${this.API_URL}/delete/${id}`,
      this.httpOptions
    );
  }
}
