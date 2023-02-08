import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  movies: Movie[] = [];
  posters: Movie[] = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.getMovies().subscribe((res: any) => {
      if (res.status === 'success') {
        this.movies = res.data.movies as Movie[];

        this.movies.forEach((movie: Movie) => {
          this.posters.push(movie);
        });
        console.log(this.posters);
      }
    });
  }
}
