import { ProfileComponent } from './../../components/profile/profile.component';
import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePollComponent } from 'src/app/components/create-poll/create-poll.component';
import { AuthGuard } from 'src/app/guards/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'create-poll',
    canActivate: [AuthGuard],
    component: CreatePollComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
