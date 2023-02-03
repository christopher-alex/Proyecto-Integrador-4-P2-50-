import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ShowtimesComponent } from '../../feature/client/showtimes/showtimes.component';
import { IndexComponent } from '../../feature/client/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'movie/:id/showtimes',
        component: ShowtimesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutClientRoutingModule {}
