import { MaterialModule } from './../material/material.module';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SidenavComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
