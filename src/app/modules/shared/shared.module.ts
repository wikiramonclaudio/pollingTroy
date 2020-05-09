import { MaterialModule } from './../material/material.module';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore/';
import { AngularFireAuthModule } from '@angular/fire/auth/';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    SidenavComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [
    SidenavComponent,
    PageNotFoundComponent,
    RouterModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ]
})
export class SharedModule { }
