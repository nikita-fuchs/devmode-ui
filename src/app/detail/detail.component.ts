import { Component, OnInit } from '@angular/core';
import { ApiStateService } from '../services/api-state.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(public apiState: ApiStateService) { }

  ngOnInit(): void {
    console.log('DetailComponent INIT');
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

}
