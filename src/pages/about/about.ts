import { Component } from '@angular/core';
import { Subscription } from 'rxjs/rx';

import { CameraPreview, Geolocation } from 'ionic-native';
import { Platform, NavController } from 'ionic-angular';

import { BitFi } from '../../models/bitfir-model';


@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {

	platform: Platform;
	lastBitFi: BitFi;

	subscriptions: Array<Subscription> = [];

	constructor(public navCtrl: NavController, platform: Platform) {
		this.platform = platform;
	}

  	ionViewWillEnter(){
	  	console.log("ionViewWillEnter");

		// Set the handler to run every time we take a picture
		this.subscriptions.push(CameraPreview.setOnPictureTakenHandler().subscribe((result) => {
			Geolocation.getCurrentPosition().then(pos => {
				this.createBitFi(result[0], pos.coords);
			}, (err) => {
		      console.log(err);
		    });
			
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

	createBitFi(imagePath: string, currentLocation: Coordinates) {
  		var bf = new BitFi(imagePath);
  		//bf.store();
  		
  		this.lastBitFi = bf;
	}

  	tp(){
  		// https://github.com/westonganger/cordova-plugin-camera-preview/tree/master
  		CameraPreview.takePicture({maxWidth:640, maxHeight:640});
  	}
}
