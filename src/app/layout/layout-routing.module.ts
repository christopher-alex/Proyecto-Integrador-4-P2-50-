import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { MoviesFormComponent } from '../feature/provider/movies/form/form.component';
import { MoviesListComponent } from '../feature/provider/movies/list/list.component';
import { ShowtimesComponent } from '../feature/client/showtimes/showtimes.component';
import { IndexComponent } from '../feature/client/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  {
    path: 'movies',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: MoviesFormComponent,
      },
      {
        path: 'form/:id',
        component: MoviesFormComponent,
      },
      {
        path: 'list',
        component: MoviesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
