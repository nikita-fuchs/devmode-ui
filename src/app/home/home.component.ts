import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { ExistingProjectsListComponent } from '../components/existing-projects-list/existing-projects-list.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private electronService: ElectronService,) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  openDir(){
    this.electronService.launchDevmode('data_devmode');
  }
}
