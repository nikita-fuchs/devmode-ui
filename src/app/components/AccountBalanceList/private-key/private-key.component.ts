import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbIconLibraries, NbPopoverDirective } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ApiStateService } from '../../../services/api-state.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-private-key',
  templateUrl: './private-key.component.html',
  styleUrls: ['./private-key.component.scss']
})
export class PrivateKeyComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: any;

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  privateKey: string = undefined;

  constructor(private apiState: ApiStateService, iconsLibrary: NbIconLibraries, private clipboard: Clipboard) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }
  ngOnInit() {
    if (this.apiState.state.prefundedAccountsMap.get(this.rowData.pub_key)) {
      this.privateKey = this.apiState.state.prefundedAccountsMap.get(this.rowData.pub_key)[0];

    }
    console.log('Rowdata: ', this.rowData);
  }

  copyPrivateKey(){
    this.clipboard.copy(this.privateKey);
    this.popover.show();
    setTimeout(() => {
      this.popover.hide();
    }, 1200);
  }

}
