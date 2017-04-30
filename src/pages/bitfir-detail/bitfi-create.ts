import { Component } from '@angular/core';
import { Subscription } from 'rxjs/rx';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CameraPreview } from 'ionic-native';

import { Platform, NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { PositionData } from '../../providers/position-data';

import { BitFir } from '../../models/bitfir-model';

import * as firebase from 'firebase';

@Component({
	templateUrl: 'bitfi-create.html'
})
export class CreateBitfiPage {
	
	subscriptions: Array<Subscription> = [];

	bitfir: BitFir

	constructor(
		public userData: UserData, public posData: PositionData, 
		public navCtrl: NavController, private navParams: NavParams,
		public platform: Platform
	) {
		this.bitfir = this.navParams.get('bitfir');
	}

  	ionViewWillEnter(){
	  	console.log("ionViewWillEnter");

		// Set the handler to run every time we take a picture
		this.subscriptions.push(CameraPreview.setOnPictureTakenHandler().subscribe((result) => {
			this.createBitFi(result[0]);
		}));

		CameraPreview.startCamera({
				x: 0, 
				y: 0, 
				width: this.platform.width(), 
				height: this.platform.height()
			}, 
			'rear',
			true, // tap to take picture
			false, // disable drag
			true, // send the preview to the back of the screen so we can add overlaying elements
			1 // alpha
      	);
   	}

	ionViewWillLeave() {
		console.log("ionViewWillLeave");

		CameraPreview.stopCamera();
		for (let subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
	}

	createBitFi(imagePath: string) {
  		this.bitfir.addBitFi(imagePath);
	}

  	tp(){
  		// https://github.com/westonganger/cordova-plugin-camera-preview/tree/master
  		CameraPreview.takePicture({maxWidth:640, maxHeight:640});
  	}
}