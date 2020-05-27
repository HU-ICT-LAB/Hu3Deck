import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AssignObjectComponent } from './assign-object/assign-object.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardOverviewComponent,
    CreateSessionComponent,
    CreateObjectComponent,
    StatisticsComponent,
    CreateUserComponent,
    AssignObjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
