import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-existing-projects-list',
  templateUrl: './existing-projects-list.component.html',
  styleUrls: ['./existing-projects-list.component.scss']
})
export class ExistingProjectsListComponent implements OnInit {

  @Output() newSelectedProject = new EventEmitter<string>();

  projectList: Array<string>;
  selectedProject: string;




  // make this a dumb component, taking input
  constructor(private electronService: ElectronService) {
    if(this.electronService.isElectron) {
      this.electronService.getExistingProjects().then(result => {
        //TODO: check for actual accounts file presence in the folders
        console.log('Found folders:', result);
        const split = result.split('\n');
        this.projectList = split.filter(project => project.length > 1);
      });
    }
  }

  ngOnInit(): void {
  }

  emitNewSelectedProject(project: string){
    this.selectedProject = project;
    this.newSelectedProject.emit(project);
  }
}
