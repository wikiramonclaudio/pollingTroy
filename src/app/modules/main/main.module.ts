import { VerticalBarchartComponent } from './../../components/vertical-barchart/vertical-barchart.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

//those two together to make the charts work
import { AppChartsModule } from './../charts/charts.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    VerticalBarchartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    SharedModule,
    NgxChartsModule,
    AppChartsModule,
    ChartsModule
  ]
})
export class MainModule { }
