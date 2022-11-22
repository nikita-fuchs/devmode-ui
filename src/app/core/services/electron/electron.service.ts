/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable, NgZone } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, shell, dialog} from 'electron';

import * as ChildProcess from 'child_process';
import * as electron from 'electron';
import * as fs from 'fs';

import { aeDevmodeStartEnvVars } from '../../../interfaces/interfaces';
import { SpawnOptions } from 'child_process';
const path = require('path');
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof ChildProcess;
  fs: typeof fs;
  shell: typeof shell;
  devmodeProcessShell: typeof ChildProcess;
  electron: typeof electron;
  dialog: typeof dialog;
  loadingSpinnerStartingDevmode: boolean;

  constructor(private router: Router, private zone: NgZone) {
    // Conditional imports
    if (this.isElectron) {
      //this.remote = window.require('@electron/remote/main')
      this.loadingSpinnerStartingDevmode = false;

      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.shell = window.require('electron').shell;
      this.dialog = window.require('electron').dialog;
      this.electron = window.require('electron');
      this.childProcess = window.require('child_process');

      this.fs = window.require('fs');
      this.getExistingProjects();

      //TODO: wrap in getter function
    // get a list of existing rojects from the main proc, for now from default path, being user data
      this.ipcRenderer.send('get-existing-projects', 'default');

      this.ipcRenderer.on('ping-good-reply', (event, response) => {
        console.log('Got this:', response)
      });


      this.childProcess.exec('node -v', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout:\n${stdout}`);
      });
  //@ts-ignore

      // Notes :
      // * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
      // and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
      // because it will loaded at runtime by Electron.
      // * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
      // in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
      // in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

      // If you want to use a NodeJS 3rd party deps in Renderer process,
      // ipcRenderer.invoke can serve many common use cases.
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  //testing:
  launchDevmode(workSpace: string, numberOfAccs: number, mnemonic?: string){
    console.log('Trying to spawn childprocess and devmode ...');

    const spawnOptions: SpawnOptions =  {
      env: {
      AE__SYSTEM__DEV_MODE: 'true',
      AE__HTTP__ENDPOINTS__DRYRUN: 'true',
      AE__SYSTEM__PLUGINS: '[{"name":"aeplugin_dev_mode"}]',
      AE__CHAIN__DB_PATH: `/Users/ethereumbook/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/workspaces/${workSpace}/`}
    };

    //@ts-ignore
    const devmodeProcessShell = this.childProcess.exec('~/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/bin/aeternity console', spawnOptions)
    // const child = this.childProcess.execFile(`~/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/bin/aeternity`, ['console'], spawnOptions)

    devmodeProcessShell.stdout.on('data', (data: string) => {
      console.log(`stdout:${data}`)
      if (data.startsWith('Eshell')){
        console.log('Started!')
        this.loadingSpinnerStartingDevmode = false;
        /* this.router.navigate(['hello/redirect/pageURL'],{queryParams:{id:1234,name:"ash"}}); */
        //@ts-ignore
        fetch("http://localhost:3313/auto_emit_mb?previous=false&auto_emit=on", )
          .then(response => response.text())
          .then(result => console.log('MB emission set'))
          .catch(error => console.log('error', error));
        this.zone.run(() => {this.router.navigate(['detail/'])});
      }
    })

    devmodeProcessShell.stderr.on('data', (data) => {
      console.log(`stderr:${data}`)
    })

    devmodeProcessShell.on('error', (error) => {console.log(`error: ${error.message}`)})

    devmodeProcessShell.on('exit', (code, signal) => {
      if (code) {console.log (`Process exit with code: ${code}`);}

      if (signal) {
        console.log(`Process killed with sianal: ${signal}`);
        console.log(`Done.`);}
      })

  }

  getExistingProjects(){
    return new Promise<string>((resolve, reject) => {

      this.childProcess.exec('ls -d -- *', {cwd:`/Users/ethereumbook/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/workspaces/`}, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        resolve(stdout);
      });
    })
  }
}
