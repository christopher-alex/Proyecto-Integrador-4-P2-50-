import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { CinemasService } from 'src/app/services/cinemas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CinemasListComponent implements OnInit {
  cinemas: Cinema[] = [];
  constructor(private cinemasService: CinemasService) {}

  ngOnInit(): void {
    this.getCinemas();
  }

  /**
   * Método `getCinemas` que obtiene la lista de cinemas a través del servicio `cinemasService`.
   */
  getCinemas(): void {
    this.cinemasService.getCinemas().subscribe((res: any) => {
      if (res.status === 'success') {
        this.cinemas = res.data.cinemas as Cinema[];
      }
    });
  }
}

   /*  const lastSeat = rowSeats.seats_available[rowSeats.seats_available.length - 1];
    rowSeats.seats_available[seat] = lastSeat; */

  /*   rowSeats.seats_available[seat - 1] = 0;

    rowSeats.seats_available = rowSeats.seats_available.filter(
      (r: any) => r.seat !== 0); */
