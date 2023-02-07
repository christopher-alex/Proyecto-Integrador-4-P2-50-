import { NgIterable } from '@angular/core';

export interface Cinema {
  _id: string;
  name: string;
  seating_capacity: [{
    row: string;
    seats: number;
    seats_available: [];
  }];
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
