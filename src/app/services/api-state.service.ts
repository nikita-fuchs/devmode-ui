/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import _ from "lodash";
import { LocalDataSource } from 'ng2-smart-table';
import { BalanceComponent } from '../components/AccountBalanceList/balance/balance.component';
import { PrivateKeyComponent } from '../components/AccountBalanceList/private-key/private-key.component';

@Injectable({
  providedIn: 'root'
})
export class ApiStateService {

  //  TODO:add typings later
 state: any = {
   accountDataSource: LocalDataSource
 }; // the latest fetched API data,

 statusPingIntervalRef;

  constructor() {
    this.state.accountDataSource = new LocalDataSource([]);

    this.pingStatusApi();

    this.statusPingIntervalRef = setInterval(async () => {
      await this.pingStatusApi();
    }, 1000);

   }

  stopPingingNodeForStatus(){
      clearInterval(this.statusPingIntervalRef);
    }

   async pingStatusApi(){
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

      // @ts-ignore
      const res = await fetch('http://localhost:3313/status', requestOptions);
      const newResult = await res.json();
      if(!_.isEqual(this.state.status, newResult)) {
        this.state.status = newResult;
        this.state.accountDataSource.load(newResult.chain.all_balances);
       };

      // make private keys of prefunded accounts accessible by public key
      this.state.prefundedAccountsMap = new Map(
        newResult.prefunded_accounts.map(object =>
          [object.pub_key, [object.priv_key, object.initial_balance]]),
      );

// console.log("Map", this.state.prefundedAccountsMap);
// console.log("Keys", Object.keys(this.state.prefundedAccountsMap));
// console.log("Test reading from map", this.state.prefundedAccountsMap.get('ak_HTXYAhQdgCCyKBLDMfADHNbmij1ntHD1AWJSYTCMNYrx3rNyF'))
   }

}
