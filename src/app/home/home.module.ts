import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ExistingProjectsListComponent } from '../components/existing-projects-list/existing-projects-list.component';
@NgModule({
  declarations: [HomeComponent, ExistingProjectsListComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
