import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { MoviesFormComponent } from '../../feature/provider/movies/form/form.component';
import { MoviesListComponent } from '../../feature/provider/movies/list/list.component';
import { CinemasFormComponent } from 'src/app/feature/provider/cinemas/form/form.component';
import { CinemasListComponent } from 'src/app/feature/provider/cinemas/list/list.component';
import { ProductsFormComponent } from 'src/app/feature/provider/products/form/form.component';
import { ProductsListComponent } from 'src/app/feature/provider/products/list/list.component';
import { ShowtimesFormComponent } from 'src/app/feature/provider/showtimes/form/form.component';
import { ShowtimesListComponent } from 'src/app/feature/provider/showtimes/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'movies',
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
      {
        path: 'showtimes',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'movie/:id',
            component: ShowtimesFormComponent,
          },
         
          {
            path: 'list',
            component: ShowtimesListComponent,
          },
        ],
      },
      {
        path: 'cinemas',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'form',
            component: CinemasFormComponent,
          },
          {
            path: 'form/:id',
            component: CinemasFormComponent,
          },
          {
            path: 'list',
            component: CinemasListComponent,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'form',
            component: ProductsFormComponent,
          },
          {
            path: 'form/:id',
            component: ProductsFormComponent,
          },
          {
            path: 'list',
            component: ProductsListComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutProviderRoutingModule {}
