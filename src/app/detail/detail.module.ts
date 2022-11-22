import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { AccountBalanceListComponent } from '../components/account-balance-list/account-balance-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BalanceComponent } from '../components/AccountBalanceList/balance/balance.component';
import { PrivateKeyComponent } from '../components/AccountBalanceList/private-key/private-key.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, SharedModule, DetailRoutingModule, Ng2SmartTableModule, NbIconModule],
  declarations: [DetailComponent, AccountBalanceListComponent, BalanceComponent, PrivateKeyComponent],
  entryComponents: [BalanceComponent, PrivateKeyComponent]
})
export class DetailModule {}
