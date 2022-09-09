import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { ApiStateService } from '../../../services/api-state.service';

@Component({
  selector: 'app-private-key',
  templateUrl: './private-key.component.html',
  styleUrls: ['./private-key.component.scss']
})
export class PrivateKeyComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: any;

  privateKey: string = undefined;

  constructor(private apiState: ApiStateService) {

  }
  ngOnInit() {
    // this.renderValue = this.value.toString().toUpperCase();
    // this.renderValue = this.apiState.state.prefundedAccountsMap[]
    if (this.apiState.state.prefundedAccountsMap.get(this.rowData.pub_key)) {
      console.log("Found private key", this.apiState.state.prefundedAccountsMap.get(this.rowData.pub_key)[0]);
      this.privateKey = this.apiState.state.prefundedAccountsMap.get(this.rowData.pub_key)[0];

    }
    console.log("Rowdata: ", this.rowData);
  }

}
