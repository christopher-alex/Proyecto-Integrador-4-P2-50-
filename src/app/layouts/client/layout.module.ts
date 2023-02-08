import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutClientRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FeatureModule } from 'src/app/feature/feature.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, MainComponent, FooterComponent],
  imports: [
    CommonModule,
    FeatureModule,
    LayoutClientRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
})
export class LayoutClientModule {}
