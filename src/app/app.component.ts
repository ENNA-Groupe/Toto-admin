import { Component, HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { PrintService } from './services/print.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
    private printService: PrintService,
    private dataService: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.api.get('user:login').subscribe(
        res => {
          console.log(" user "+ res + " is connected!");
        }
      );
      this.dataService.onResize(this.platform.width());
    });
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event){
    this.dataService.onResize(event.target.innerWidth);
  }
}
