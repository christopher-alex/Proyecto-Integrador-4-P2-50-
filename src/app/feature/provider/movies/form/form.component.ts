import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { Movie } from '../../../../models/movie';
import { MoviesService } from '../../../../services/movies.service';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

/**
 * Clase MoviesFormComponent
 * Se encarga de manejar el formulario para crear y editar películas.
 */
export class MoviesFormComponent implements OnInit, OnDestroy {
  // Película actual
  currentMovie = {} as Movie;

  // Título de la página
  title = 'Nueva Película';

  // Subscripción a los parámetros de la ruta
  paramsSubscription: Subscription;

  // Flag que indica si el formulario ha sido enviado
  submitted = false;

  // Año actual
  currentYear = new Date().getFullYear();

  // Flag que indica si la URL de la portada es válida
  urlPosterValid = false;
  urlBackdropValid = false;
  urlTrailerValid = false;

  // Grupo de validación de formularios
  formGroup: FormGroup;

  /**
   * Inyecta las dependencias necesarias para el funcionamiento de la clase
   * @param moviesService Servicio que contiene los métodos para interactuar con la API de películas
   * @param router Objeto Router de Angular para navegar entre componentes
   * @param activatedRoute Objeto ActivatedRoute para obtener información sobre la ruta activa
   * @param formBuilder Servicio que permite crear formularios en Angular
   * @param http Servicio HttpClient de Angular para realizar peticiones HTTP
   */
  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.initForm();
  }

  /**
   * Inicializa el formulario y sus validaciones
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      _id: [null],
      title: [
        'Titulo',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currentYear),
        ],
      ],

      duration: [
        '',
        [Validators.required, Validators.min(1), Validators.max(300)],
      ],
      poster: ['', [Validators.required]],
      trailer: ['', [Validators.required]],
      synopsis: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
      genre: ['', [Validators.required]],
      directors: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      actors: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      createdAt: [null],
      updatedAt: [null],
    });

    /**
     * Observable que detecta cambios en el valor del formulario
     */
    this.formGroup.valueChanges.subscribe((data) => this.onValueChanged(data));

    /**
     * Observable que detecta cambios en el valor del control "poster" del formulario
     */
    this.formGroup.controls['poster'].valueChanges.subscribe((value) => {
      this.verifyUrl(value).subscribe((result) => {
        if (result) {
          this.urlPosterValid = true;
          this.formGroup.controls['poster'].setErrors(null);
        } else {
          this.urlPosterValid = false;
          this.formGroup.controls['poster'].setErrors({ invalidUrl: true });
        }
      });
    });
    this.formGroup.controls['trailer'].valueChanges.subscribe((value) => {
      const validId = /^[a-zA-Z0-9_-]{11}$/.test(value);

        if (validId) {
          this.urlTrailerValid = true;
          this.formGroup.controls['trailer'].setErrors(null);
        } else {
          this.urlTrailerValid = false;
          this.formGroup.controls['trailer'].setErrors({ invalidID: true });
        }

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
        }
      }
    );
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Se utiliza para cancelar la suscripción a los parámetros del router.
   */
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  /**
   * Método que se ejecuta al hacer submit en el formulario.
   * Verifica si el formulario es válido y, en caso de ser así,
   * ejecuta `updateMovie()` si existe una película actual o
   * `createMovie()` si no existe.
   */
  onSubmit(): void {
    this.submitted = true;
    if (!this.formGroup.valid) {
      return;
    }
    if (this.currentMovie._id) {
      this.updateMovie();
    } else {
      this.createMovie();
    }
  }

  /**
   * Este método es llamado cuando el componente es destruido y se encarga de desuscribir la suscripción
   * a los parámetros de la ruta.
   */
  onValueChanged(data?: any) {
    if (data) {
      this.currentMovie = data;
      console.log(this.currentMovie);
    }
  }

  /**
   * Este método verifica si la URL es válida haciendo una petición HEAD a la URL dada.
   * @param url URL a verificar
   * @returns boolean indicando si la URL es válida o no
   */
  verifyUrl(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map((response) => response.status >= 200 && response.status < 300),

      catchError((error) => of(false))
    );
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
        this.formGroup.patchValue(this.currentMovie);
        this.title = 'Película: ' + this.currentMovie.title;
      }
    });
  }

  /**
   * Método para crear una nueva película.
   * Realiza una llamada al servicio `MoviesService` para crear la película en el sistema.
   */
  createMovie(): void {
    this.moviesService.createMovie(this.currentMovie).subscribe((res: any) => {
      if (res.status === 'success') {
        this.router.navigate(['/layout/movies/list']);
      }
    });
  }

  /**
   * Método para actualizar una película existente.
   * Realiza una llamada al servicio `MoviesService` para actualizar los datos de la película en el sistema.
   */
  updateMovie(): void {
    this.moviesService
      .updateMovie(this.currentMovie._id, this.currentMovie)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/movies/list']);
        }
      });
  }

  /**
   * Método para eliminar una película existente.
   * Realiza una llamada al servicio `MoviesService` para eliminar la película del sistema.
   */
  deleteMovie(): void {
    this.moviesService
      .deleteMovie(this.currentMovie._id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/movies/list']);
        }
      });
  }
}
