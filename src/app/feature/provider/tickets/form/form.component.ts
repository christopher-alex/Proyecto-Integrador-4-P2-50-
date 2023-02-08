import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Ticket } from 'src/app/models/ticket';
import { ProductsService } from 'src/app/services/products.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class TicketsFormComponent implements OnInit {
  // Ticket actual
  currentTicket = {} as Ticket;

  // Título de la página
  title = 'Nuevo ticket';

  // Subscripción a los parámetros de la ruta
  paramsSubscription: Subscription;

  // Grupo de validación de formularios
  formGroup: FormGroup;

  sets: number;

  constructor(
    private ticketsService: TicketsService,
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
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      price: [null, [Validators.required]],
      createdAt: [null],
      updatedAt: [null],
    });
    this.formGroup.valueChanges.subscribe((data) => {
      this.currentTicket = data;
    });
  }

  /**
   * Método que se ejecuta al inicializarse el componente
   */
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.getTicket(params['id']);
        }
      }
    );
  }

  /**
   * Método que se ejecuta al hacer submit en el formulario.
   * Verifica si el formulario es válido y, en caso de ser así,
   * ejecuta `updateTicket()` si existe un ticket actual o
   * `this.createTicket();
   * ()` si no existe.
   */
  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (this.currentTicket._id) {
      this.updateTicket();
    } else {
      console.log('create');
      this.createTicket();
    }
  }
  /**
   * Método para obtener la información de un ticket específico a partir de su identificador.
   * Realiza una llamada al servicio `TicketsService` para obtener los datos de un ticket.
   * @param id Identificador del ticket a obtener.
   */
  getTicket(id: string) {
    this.ticketsService.getTicket(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentTicket = res.data.ticket;
        this.formGroup.setValue(this.currentTicket);
        this.title = 'Editar Ticket';
      }
    });
  }
  /**
   * Método para crear un nuevo ticket.
   * Realiza una llamada al servicio `TicketsService` para crear un ticket en el sistema.
   */
  createTicket() {
    this.ticketsService
      .createTicket(this.currentTicket)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/tickets']);
        }
      });
  }
  /**
   * Método para actualizar un ticket existente.
   * Realiza una llamada al servicio `TicketsService` para actualizar los datos de un ticket en el sistema.
   */
  updateTicket() {
    this.ticketsService
      .updateTicket(this.currentTicket._id, this.currentTicket)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/tickets']);
        }
      });
  }

  /**
   * Método para eliminar un ticket existente.
   * Realiza una llamada al servicio `TicketsService` para eliminar un ticket del sistema.
   */
  deleteTicket(): void {
    this.ticketsService
      .deleteTicket(this.currentTicket._id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/tickets/list']);
        }
      });
  }
}
