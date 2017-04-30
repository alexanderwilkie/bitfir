import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
	
  rootPage = LoginPage;

  constructor(platform: Platform) {
    const fbConf = {
        apiKey:"AIzaSyCV6zOOj4q5Z8GqxeN4fAc33-T2-c8OnD8",
        authDomain: "bitfir-1243.firebaseapp.com",
        databaseURL: "https://bitfir-1243.firebaseio.com",
        storageBucket: "bitfir-1243.appspot.com",
        messagingSenderId: "178499208769"
    };
    firebase.initializeApp(fbConf);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
      