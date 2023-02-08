import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatureRoutingModule } from './feature-routing.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

/* importaciones de pipes */
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { PricePipe } from '../shared/pipes/price.pipe';

/* importaciones de componentes */
import { MoviesFormComponent } from './provider/movies/form/form.component';
import { MoviesListComponent } from './provider/movies/list/list.component';
import { CinemasFormComponent } from './provider/cinemas/form/form.component';
import { CinemasListComponent } from './provider/cinemas/list/list.component';
import { ProductsFormComponent } from './provider/products/form/form.component';
import { ProductsListComponent } from './provider/products/list/list.component';
import { ShowtimesFormComponent } from './provider/showtimes/form/form.component';
import { ShowtimesListComponent } from './provider/showtimes/list/list.component';


import { IndexComponent } from './client/index/index.component';
import { ShowtimesComponent } from './client/showtimes/showtimes.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { TicketsFormComponent } from './provider/tickets/form/form.component';
import { TicketsListComponent } from './provider/tickets/list/list.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TimeAgoPipe,
    PricePipe,

    IndexComponent,
    ShowtimesComponent,

    MoviesFormComponent,
    MoviesListComponent,
    CinemasFormComponent,
    CinemasListComponent,
    ShowtimesFormComponent,
    ShowtimesListComponent,
    ProductsFormComponent,
    ProductsListComponent,
    TicketsFormComponent,
    TicketsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
})
export class FeatureModule {}
