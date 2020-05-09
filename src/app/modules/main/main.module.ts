import { FormsModule } from '@angular/forms';
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
import { CreatePollComponent } from 'src/app/components/create-poll/create-poll.component';
import { UserService } from 'src/app/services/user.service';
import { PollService } from 'src/app/services/poll.service';
// import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    VerticalBarchartComponent,
    CreatePollComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    SharedModule,
    NgxChartsModule,
    AppChartsModule,
    ChartsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [UserService, PollService],

})
export class MainModule { }
