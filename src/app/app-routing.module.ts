import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { MainComponent } from './modules/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash : true });
