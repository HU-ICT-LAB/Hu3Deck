import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CreateSessionComponent } from './create-session/create-session.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardOverviewComponent},
  {path: 'session',component: CreateSessionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
