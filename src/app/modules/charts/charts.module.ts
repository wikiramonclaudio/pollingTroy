import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts/';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    ChartsModule
  ]
})
export class AppChartsModule { }
