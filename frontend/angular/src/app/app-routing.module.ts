import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CreateSessionComponent }     from './create-session/create-session.component';
import { CreateObjectComponent }      from './create-object/create-object.component';
import { StatisticsComponent }        from './statistics/statistics.component';
import { CreateUserComponent }        from './create-user/create-user.component';
import { AssignObjectComponent }      from './assign-object/assign-object.component';
import { CreateSceneComponent }       from './create-scene/create-scene.component';
import {WebhookComponent} from "./webhook/webhook.component";

const routes: Routes = [
  {path: '', component: CreateSessionComponent},
  {path:'dashboard/:sessionid', component:DashboardOverviewComponent},
  {path: 'create-prop', component: CreateObjectComponent},
  {path:'statistics',component:StatisticsComponent},
  {path: 'assign-object', component: AssignObjectComponent},
  {path: 'create-scene', component: CreateSceneComponent},
  {path: 'webhook', component: WebhookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
