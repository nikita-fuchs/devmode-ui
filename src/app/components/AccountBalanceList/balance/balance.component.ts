import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements ViewCell, OnInit {


  @Input() value: string | number;
  @Input() rowData: any;

  renderValue: any;

  ngOnInit() {
    this.renderValue = Number(this.value) / Math.pow(10,18);
    // this.renderValue = this.value;
    // const test = this.eToNumber(String(this.value));
    // console.log("success?", test)
  }
/*

  eToNumber(num) {
    let sign = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (num += '').charAt(0) == '-' && (num = num.substring(1), sign = '-');
    const arr = num.split(/[e]/ig);
    if (arr.length < 2) {return sign + num;}
    const dot = (.1).toLocaleString().substr(1, 1); let n = arr[0]; const exp = +arr[1];
        let w = (n = n.replace(/^0+/, '')).replace(dot, '');
      const pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp;
      let L   = pos - w.length; const s = '' + BigInt(w);
      w   = exp >= 0 ? (L >= 0 ? s + '0'.repeat(L) : r()) : (pos <= 0 ? '0' + dot + '0'.repeat(Math.abs(pos)) + s : r());
    L= w.split(dot); if (L[0]==0 && L[1]==0 || (+w==0 && +s==0) ) {w = 0;} //** added 9/10/2021
    return sign + w;
    function r() {return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);}
  } */

}
