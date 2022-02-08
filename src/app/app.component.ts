import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireauth: AngularFireAuth,
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut(nav: string){
    this.fireauth.auth.signOut().then(() => {
      console.log('Disconnected');
      //this.logout.navigateBack(nav);
    })
  }
  sideMenu(){
    this.navigate=[
      {
        title: "Settings",
        url: "/settings",
        back: false
      },
      {
        title: "Profil",
        url: "/profil",
        back: false
      },
      {
        title: "Log out",
        url: "/login",
        back: true
      }
    ]
  }
}
