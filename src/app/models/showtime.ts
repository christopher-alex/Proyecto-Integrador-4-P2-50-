import { Cinema } from "./cinema";
import { Movie } from "./movie";

export interface Showtime {
  _id: string;
  movie: Movie;
  cinema: Cinema;
  date: Date;
  time: Date;
  available_seats: number;
  createdAt: Date;
  updatedAt: Date;
}
