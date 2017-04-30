import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

import { BitFir } from '../models/bitfir-model';

import * as firebase from 'firebase';


@Injectable()
export class UserData {
	user: firebase.User;

	constructor() {}

	initUser(user: firebase.User) {
		console.log('UserData.initUser');
		this.user = user;
	};

	loginViaFacebook(): Promise<FacebookLoginResponse> {
		return Facebook.login(["email"]).then((response: any) => {
			// Authenticate with Facebook using an existing OAuth 2.0 access token
			this.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(
				response.authResponse.accessToken
			));
		});
	}

	signInWithCredential(credential: firebase.auth.AuthCredential) {

		// The auth state change above will take care of the redirect..
		return firebase.auth().signInWithCredential(credential).then((result: any) => {
			console.error('UserData.signInWithCredential - Firebase Authentication OK:', result);
		}).catch((_error: any) => {
			// Check error.code and error.message
			console.error('UserData.signInWithCredential - Firebase Authentication Error:', _error);
			if (_error.code === 'auth/account-exists-with-different-credential') {
				firebase.auth().fetchProvidersForEmail(_error.email).then(function(providers) {
					// The returned 'providers' is a list of the available providers
					// linked to the email address. Please refer to the guide for a more
					// complete explanation on how to recover from this error.
					console.log('auth/account-exists-with-different-credential Error:', providers);
				});
			}
		});
	}

	logout() {
		console.log('UserData.logout');

		return firebase.auth().signOut().then(() => {
			console.log('UserData.logout - User has signed out of firebase!');
		}).catch((error) => {
			console.error('UserData.logout - Sign Out Error', error);
		});
	};

	get bitFirs(): BitFir[] {
		console.log('UserData.bitFirs');

		var b: BitFir[] = [];

		firebase.database().ref('user-bitfirs/' + this.user.uid).once('value').then(function(snapshot) {
			for (var k in snapshot.val()) {
				console.log('UserData.bitFirs'+k);

				firebase.database().ref('bitfir/' + k).once('value').then(function(snapshot) {
					if (snapshot.exists()) {
						console.log('UserData.bitFirs'+snapshot.ref.key);

						b.push(BitFir.fromDatabase(
								snapshot.ref.key,
								snapshot.val().name,
								snapshot.val().location,
								snapshot.val().orientation
							)
						);
					}
				});
			}
		});

		return b;
	}
}