import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutProviderRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FeatureModule } from '../../feature/feature.module';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    DashboardComponent,
    LineChartComponent,
    BarChartComponent,
  ],
  imports: [CommonModule, FeatureModule, LayoutProviderRoutingModule, ChartsModule],
})
export class LayoutProviderModule {}
