import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AssignObjectComponent } from './assign-object/assign-object.component';
import {CreateSceneComponent } from './create-scene/create-scene.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardOverviewComponent},
  {path: 'session',component: CreateSessionComponent},
  {path: 'create-prop', component: CreateObjectComponent},
  {path:'statistics',component:StatisticsComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'assign-object', component: AssignObjectComponent},
  {path: 'create-scene', component: CreateSceneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
