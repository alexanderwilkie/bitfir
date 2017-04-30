import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-user-detail',
	templateUrl: 'user-detail.html'
})
export class UserDetailPage {

	constructor(public app: App, public navCtrl: NavController, public userData: UserData) {}

	logout() {
		console.log('UserDetailPage.logout');

		var a = this;
		this.userData.logout().then((status) => {
			console.log('UserDetailPage.logout - yay', status);
			a.app.getRootNav().setRoot(LoginPage);

		}).catch((err) => {
			console.error(err);
		});
	}
}