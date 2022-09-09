import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './environments/environment';

const sys = require('sys');
const exec = require('child_process').exec;
const { shell } = require('electron');

if (APP_CONFIG.production) {
  enableProdMode();
}

function puts(error, stdout, stderr) { sys.puts(stdout)}
exec("ls -la", function(err, stdout, stderr) {
  console.log("yo?", stdout);
});

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
