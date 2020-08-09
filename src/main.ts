import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const LogRocket = require('logrocket');

if (environment.production) {
  enableProdMode();
  LogRocket.init('wgjuww/ear-training');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
