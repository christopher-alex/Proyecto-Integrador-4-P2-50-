import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css'],
})
export class ShowtimesComponent implements OnInit {
  movie: Movie = {} as Movie;
  // Subscripción a los parámetros de la ruta
  paramsSubscription: Subscription;
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.getMovie(params['id']);
        }
      }
    );
  }

  getMovie(id: string): void {
    this.moviesService.getMovie(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.movie = res.data.movie as Movie;
      }
    });
  }

  getPreviewUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.getEmbedUrl(this.movie.trailer)
    );
  }

  getEmbedUrl(url: string) {
    return url.replace(

      
      'https://www.youtube.com/watch?v=',
      'https://www.youtube.com/embed/'
    );
  }
}
