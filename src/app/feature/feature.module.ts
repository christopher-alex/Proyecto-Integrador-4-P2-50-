import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatureRoutingModule } from './feature-routing.module';

/* importaciones de pipes */
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

/* importaciones de componentes */
import { MoviesFormComponent } from './provider/movies/form/form.component';
import { MoviesListComponent } from './provider/movies/list/list.component';
import { ListComponent } from './provider/billboard/list/list.component';
import { FormComponent } from './provider/billboard/form/form.component';
import { ShowtimesComponent } from './client/showtimes/showtimes.component';
import { IndexComponent } from './client/index/index.component';

@NgModule({
  declarations: [
    MoviesFormComponent,
    MoviesListComponent,
    TimeAgoPipe,
    ListComponent,
    FormComponent,
    ShowtimesComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FeatureModule {}
