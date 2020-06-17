import { Component, ViewChild } from '@angular/core';

import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private location : PlatformLocation,
    private alertController : AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(0, async ()=> {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        }
        else if (this.router.url === "/login" || this.router.url === "/tabs/Menu" ) {
          const alert = await this.alertController.create({
            header:"fermer l'application",
            message: "vous voulez fermer l'application",
            buttons: [
              {
                text:"Annuler",
                role:"cancel"
              },
              {
                text:"fermer l'App",
                handler: ()=> {
                  navigator["app"].exitApp();
                }
              }
            ]
          });
          await alert.present();
        }
      });

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      });
      
    });
  }
}
