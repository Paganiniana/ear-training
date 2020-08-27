import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';

const Vivus = require('vivus');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  production;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.production=environment.production;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Background methods
  @ViewChild('backgroundTarget')
  backgroundTarget;

  ngAfterViewInit() {
    new Vivus(this.backgroundTarget.nativeElement, {
      file: "/assets/svg/temp_background.svg",
      duration: 200,
      type: "oneByOne",
      start: "autostart",
    })
  }
}
