import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cinema } from 'src/app/models/cinema';
import { CinemasService } from 'src/app/services/cinemas.service';
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class CinemasFormComponent implements OnInit {
  @ViewChild('seats') screen: ElementRef;

  // Película actual
  currentCinema = {} as Cinema;

  // Título de la página
  title = 'Nuevo Cinema';

  // Subscripción a los parámetros de la ruta
  paramsSubscription: Subscription;

  // Grupo de validación de formularios
  formGroup: FormGroup;
  formGrid: FormGroup;

  sets: number;
  image: any;

  constructor(
    private cinemasService: CinemasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  /**
   * Inicializa el formulario y sus validaciones
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      _id: [null],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],

      seating_capacity: [[], [Validators.required]],
      image: [''],
      createdAt: [null],
      updatedAt: [null],
    });
    this.formGrid = this.formBuilder.group({
      rowsNumber: [5, [Validators.required]],
      columnsNumber: [10, [Validators.required]],
    });
    this.formGroup.valueChanges.subscribe((data) => {
      this.currentCinema = data;
    });
  }

  getAvailableSeats(row: any) {}

  /**
   * Método que se ejecuta al inicializarse el componente
   */
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.getCinema(params['id']);
        } else {
          this.generateSeats();
        }
      }
    );
  }

  /**
   * Método que se ejecuta al hacer submit en el formulario.
   * Verifica si el formulario es válido y, en caso de ser así,
   * ejecuta `updateCinema()` si existe un cinema actual o
   * `createCinema()` si no existe.
   */
  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (this.currentCinema._id) {
      this.updateCinema();
    } else {
      this.createCinema();
    }
  }

  getCinema(id: string) {
    this.cinemasService.getCinema(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentCinema = res.data.cinema;
        this.formGroup.setValue(this.currentCinema);
        this.title = 'Editar Cinema';
      }
    });
  }

  createCinema() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.image = canvas.toDataURL();
      this.currentCinema.image = this.image;
      this.cinemasService
        .createCinema(this.currentCinema)
        .subscribe((res: any) => {
          if (res.status === 'success') {
            this.router.navigate(['/layout/cinemas']);
          }
        });
    });
  }

  updateCinema() {
    this.cinemasService
      .updateCinema(this.currentCinema._id, this.currentCinema)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/cinemas']);
        }
      });
  }

  createSeatsArray(numOfSeats: number): number[] {
    return Array.from({ length: numOfSeats }, (_, index) => index + 1);
  }

  rows = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  generateSeats() {
    const seating_capacity = this.formGroup.get('seating_capacity')?.value;

    for (let i = 0; i < this.formGrid.get('rowsNumber')?.value; i++) {
      const row = this.rows[i];
      seating_capacity.push({
        row: row,
        seats: this.formGrid.get('columnsNumber')?.value,
        seats_available: [
          ...this.createSeatsArray(this.formGrid.get('columnsNumber')?.value),
        ],
      });
    }
    this.formGroup.get('seating_capacity')?.setValue(seating_capacity);
  }

  removeSeat(row: string, seat: number) {
    const seating_capacity = this.formGroup.get('seating_capacity')?.value;
    console.log(seating_capacity);
    const rowSeats = seating_capacity.find((r: any) => r.row === row);

    rowSeats.seats_available.splice(seat, 0, 0);
    rowSeats.seats_available.pop();

    /* const seatsEmpty: any[] = [];
    rowSeats.seats_available.forEach((element: any) => {
      const i = rowSeats.seats_available.indexOf(element);
      if (element === 0) {
        console.log(i);
        seatsEmpty.push(i);
      }
    }); */

    /* seatsEmpty.forEach((element: any) => {
      rowSeats.seats_available.splice(element, 0, 0);
      rowSeats.seats_available.pop();
    }); */



    console.log(rowSeats.seats_available);
    this.formGroup.get('seating_capacity')?.setValue(seating_capacity);
  }

  addSeat(row: string) {
    const seating_capacity = this.formGroup.get('seating_capacity')?.value;
    const rowSeats = seating_capacity.find((r: any) => r.row === row);

    rowSeats.seats_available.push(0);
  }

  getSeatIndices(row: any) {
    return Array.from(Array(row.seats).keys());
  }
}
