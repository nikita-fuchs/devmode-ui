import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() value: string;
  @Input() rowData: any;

  renderValue: any;

  constructor() { }


  ngOnInit(): void {
    this.renderValue = this.value;
  }

}
