/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { aeDevmodeStartEnvVars } from '../../../interfaces/interfaces';
import { SpawnOptions } from 'child_process';



@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  fs: typeof fs;
  shell: typeof shell;

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.shell = window.require('electron').shell;

      this.fs = window.require('fs');

      this.childProcess = window.require('child_process');
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
  openDir(){
    // this.shell.openExternal('https://github.com');
    // const command = `AE__SYSTEM__DEV_MODE=true AE__SYSTEM__PLUGINS='[{"name":"aeplugin_dev_mode"}]' AE__CHAIN__DB_PATH='/Users/ethereumbook/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/data_devmode/' ~/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/bin/aeternity console`;

    console.log('Trying to spawn childprocess and devmode ...');
    
    const spawnOptions: SpawnOptions =  {
      env: {
      AE__SYSTEM__DEV_MODE: 'true',
      AE__SYSTEM__PLUGINS: '[{"name":"aeplugin_dev_mode"}]',
      AE__CHAIN__DB_PATH: '/Users/ethereumbook/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/data_devmode/'}
    };


    const child = this.childProcess.execFile('`~/Documents/DAPPS/Aeternity/fresh_repos/aeternity/_build/prod/rel/aeternity/bin/aeternity`', ['console'], spawnOptions)

    child.stdout.on('data', (data) => {
      console.log(`stdout:${data}`)
    })

    child.stderr.on('data', (data) => {
      console.log(`stderr:${data}`)
    })

    child.on('error', (error) => {console.log(`error: ${error.message}`)})

    child.on('exit', (code, signal) => {
      if (code) {console.log (`Process exit with code: ${code}`);}

      if (signal) {
        console.log(`Process killed with sianal: ${signal}`);
        console.log(`Done.`);}
      })

  }

  // example for piping: 
//   var child = require('child_process').exec('python celulas.py')
//   child.stdout.pipe(process.stdout)
// child.on('exit', function() {
//   process.exit()
// })

}
