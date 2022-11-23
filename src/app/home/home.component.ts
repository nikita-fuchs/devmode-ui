/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedProject: string;
  newProjectSetupForm: FormGroup;

  constructor(private router: Router, public electronService: ElectronService,) {
    this.selectedProject = '';

    this.newProjectSetupForm = new FormGroup({
      projectName: new FormControl('', [Validators.required]),
      // mnemonic: new FormControl("", [Validators.required, this.urlRegexCheck()]), TODO: implement mnemonic regex check
      mnemonic: new FormControl('hand cancel fox above correct physical void hungry height unknown vital rice', [Validators.required]),
      numberOfAccs: new FormControl(10, [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log('HomeComponent INIT');


  }

  setSelectedProject(project){
    this.selectedProject = project;
  }

  launchDevmode(projectName: string){
    this.electronService.loadingSpinnerStartingDevmode = true;
    this.electronService.launchDevmode(projectName,
                                       this.newProjectSetupForm.get('numberOfAccs').value,
                                       this.newProjectSetupForm.get('mnemonic').value,
                                        );
  }

/*   mnemonicRegexCheck(): ValidatorFn {
    return (control:AbstractControl) : { [key: string]: any } | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const isUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(value);
        return !isUrl ? {malformattedUrl: value}: null;
    }
  } */

}
