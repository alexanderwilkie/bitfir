import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

import * as firebase from 'firebase';


@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	constructor(public navCtrl: NavController, public userData: UserData, private zone: NgZone) {}

	ionViewDidEnter() {
		console.log('LoginPage.ionViewDidEnter');

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log('LoginPage.ionViewDidEnter.onAuthStateChanged - ', user);
				this.userData.initUser(user);

				// https://forum.ionicframework.com/t/after-setroot-tabspage-the-default-tab-page-appears-twice/71770/10
				this.zone.run(() => {
					this.navCtrl.setRoot(TabsPage);
				});
			} else {
				// No user is signed in.
				console.log('LoginPage.ionViewDidEnter.onAuthStateChanged - no user!', user);
			}
		});
	}

	loginViaFacebook() {
		console.log('LoginPage.loginViaFacebook');

		// The auth state change above will take care of the redirect..
		this.userData.loginViaFacebook().then(() => {
			console.log('LoginPage.loginViaFacebook - Facebook Authentication OK!');
		}).catch((error) => {
			console.error('LoginPage.loginViaFacebook - Facebook Authentication Error:', error);
		});		
	}
}
