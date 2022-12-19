/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ExistingProjectsListComponent } from '../components/existing-projects-list/existing-projects-list.component';
import { NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
  NbLayoutModule,
  NbPopoverModule,
  NbTooltipModule,
  NbUserModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberPickerModule } from 'ng-number-picker';

//temporary, for tryout
import { NgIconsModule } from '@ng-icons/core';
import { jamKey } from '@ng-icons/jam-icons';

@NgModule({
  declarations: [HomeComponent, ExistingProjectsListComponent],
  imports: [CommonModule,
    NgIconsModule.withIcons({ jamKey }), // temporary, for tryout
    NbTooltipModule,
     SharedModule,
      HomeRoutingModule,
       NbListModule,
       NbPopoverModule,
        NbCardModule,
         NbUserModule,
        NbAccordionModule,
        NbButtonModule,
        ReactiveFormsModule,
        NbIconModule,
        NbInputModule,
        NbLayoutModule,
        NumberPickerModule,
        NbSpinnerModule
      ]
})
export class HomeModule {}
