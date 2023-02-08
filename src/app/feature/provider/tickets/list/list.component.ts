import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class TicketsListComponent implements OnInit {
  tickets: Ticket[] = [];
  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  /**
   * Método `getTickets` que obtiene la lista de tickets a través del servicio `ticketsService`.
   */
  getTickets(): void {
    this.ticketsService.getTickets().subscribe((res: any) => {
      if (res.status === 'success') {
        this.tickets = res.data.tickets as Ticket[];
      }
    });
  }

  /**
   * Método `getTicketsByType` que obtiene una lista de tickets por su tipo a través del servicio `ticketsService`.
   * @param type Tipo del ticket a buscar.
   */
  getTicketsByType(type: string): void {
    if (type === '') {
      this.getTickets();
      return;
    }
    this.ticketsService.getTicketsByType(type).subscribe((res: any) => {
      if (res.status === 'success') {
        this.tickets = res.data.tickets as Ticket[];
      }
    });
  }
}
