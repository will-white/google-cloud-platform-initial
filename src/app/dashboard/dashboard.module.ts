import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    SharedModule, NgxChartsModule, DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }