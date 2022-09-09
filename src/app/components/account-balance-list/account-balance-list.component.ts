import { Component, OnInit } from '@angular/core';
import { ApiStateService } from '../../services/api-state.service';
import { BalanceComponent } from '../AccountBalanceList/balance/balance.component';
import { PrivateKeyComponent } from '../AccountBalanceList/private-key/private-key.component';

@Component({
  selector: 'app-account-balance-list',
  templateUrl: './account-balance-list.component.html',
  styleUrls: ['./account-balance-list.component.scss']
})
export class AccountBalanceListComponent implements OnInit {


  constructor(public apiState: ApiStateService) {


    this.apiState.state.accountBalanceListSettings = {
      // mode: "external",
      hideSubHeader: true,
      actions: false,
      // rowClassFunction: (row) => {console.log('Row?', row); return 'address-column-entry'; },
   /*    attr: {
        class : 'lol'
      }, */
      columns: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        pub_key: {
          title: 'Address',
          class: 'address-column',
          filter: false,

        },
        balance: {
          title: 'Balance',
          filter: false,
          type: 'custom',
          renderComponent: BalanceComponent,
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        priv_key: {
          title: 'Private Key',
          type: 'custom',
          renderComponent: PrivateKeyComponent,
        }
      }
    };

  }

  onSearch(query: string = '') {
    if (query === '') {
      this.apiState.state.accountDataSource.setFilter([]);
    } else {
    this.apiState.state.accountDataSource.setFilter([
      // fields we want to include in the search
      {
        field: 'pub_key',
        search: query
      },
      {
        field: 'balance',
        search: query
      }
      ], false);
      // second parameter specifying whether to perform 'AND' or 'OR' search
      // (meaning all columns should contain search query or at least one)
      // 'AND' by default, so changing to 'OR' by setting false here
    }
  }

  ngOnInit(): void {
  }

}
