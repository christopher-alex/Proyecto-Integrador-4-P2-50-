import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cinema } from 'src/app/models/cinema';
import { Movie } from 'src/app/models/movie';
import { Showtime } from 'src/app/models/showtime';
import { CinemasService } from 'src/app/services/cinemas.service';
import { MoviesService } from 'src/app/services/movies.service';
import { ShowtimesService } from 'src/app/services/showtimes.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class ShowtimesFormComponent implements OnInit {
  // Película actual
  currentShowtime = {} as Showtime;
  currentMovie = {} as Movie;
  cinemas: Cinema[] = [];

  // Título de la página
  title = 'Nuevo producto';

  // Subscripción a los parámetros de la ruta
  paramsSubscription: Subscription;

  // Grupo de validación de formularios
  formGroup: FormGroup;

  sets: number;

  showtimes: Showtime[] = [];

  constructor(
    private showtimesService: ShowtimesService,
    private cinemasService: CinemasService,
    private moviesService: MoviesService,
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
      movie: [null, [Validators.required]],
      cinema: [null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      available_seats: [null],
      createdAt: [null],
      updatedAt: [null],
    });
    this.formGroup.valueChanges.subscribe((data) => {
      this.currentShowtime.available_seats = data.available_seats;
      console.log(data);
    });
  }

  /**
   * Método que se ejecuta al inicializarse el componente
   */
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.getMovie(params['id']);
          this.getShowtimesByMovie(params['id']);
        }
      }
    );
    this.getCinemas();
  }

  /**
   * Método que se ejecuta al hacer submit en el formulario.
   * Verifica si el formulario es válido y, en caso de ser así,
   * ejecuta `updateProduct()` si existe un producto actual o
   * `createProduct()` si no existe.
   */
  onSubmit(): void {
    console.log("hkjhk");
    if (!this.formGroup.valid) {
      return;
    }
    if (this.currentShowtime._id) {
      this.updateShowtime();
    } else {
      console.log('create');
      this.createShowtime();
    }
  }

  /**
   * Método `getMovies` que obtiene la lista de películas a través del servicio `moviesService`.
   */
  getShowtimesByMovie(id:string): void {
    this.showtimesService.getShowtimesByMovie(id).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.showtimes = res.data.showtimes as Showtime[];
      }
    });
  }

  /**
   * Método para obtener la información de un producto específico a partir de su identificador.
   * Realiza una llamada al servicio `ProductsService` para obtener los datos de un producto.
   * @param id Identificador del producto a obtener.
   */
  getShowtime(id: string) {
    this.showtimesService.getShowtime(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentShowtime = res.data.showtime as Showtime;
        console.log(this.currentShowtime);
        this.formGroup.setValue(this.currentShowtime);
        this.formGroup.get('movie')?.setValue(this.currentMovie._id);
        this.formGroup.get('cinema')?.setValue(this.currentShowtime.cinema._id);
        this.title = 'Editar Proyección';
        this.getShowtimesByMovie(this.currentShowtime.movie._id);
      }
    });
  }
  /**
   * Método para crear un nuevo producto.
   * Realiza una llamada al servicio `ProductsService` para crear un producto en el sistema.
   */
  createShowtime() {
    const data = this.formGroup.value;
    data.date = new Date(data.date);
    data.time = new Date(data.time);
    this.showtimesService.createShowtime(data).subscribe((res: any) => {
      if (res.status !== 'success') {
        this.getShowtimesByMovie(this.formGroup.get('movie')?.value)
      }
    });
  }

  /**
   * Método para actualizar un producto existente.
   * Realiza una llamada al servicio `ProductsService` para actualizar los datos de un producto en el sistema.
   */
  updateShowtime() {
    this.showtimesService
      .updateShowtime(this.currentShowtime._id, this.currentShowtime)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/showtimes']);
        }
      });
  }

  /**
   * Método para eliminar un producto existente.
   * Realiza una llamada al servicio `ProductsService` para eliminar un producto del sistema.
   */
  deleteShowtime(): void {
    this.showtimesService
      .deleteShowtime(this.currentShowtime._id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/showtimes/list']);
        }
      });
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

  /**
   * Método para obtener la información de una película específica a partir de su identificador.
   * Realiza una llamada al servicio `MoviesService` para obtener los datos de la película.
   * @param id Identificador de la película a obtener.
   */
  getMovie(id: string): void {
    this.moviesService.getMovie(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentMovie = res.data.movie as Movie;
        this.formGroup.get('movie')?.setValue(this.currentMovie._id);
        this.title = 'Película: ' + this.currentMovie.title;
      }
    });
  }
}
