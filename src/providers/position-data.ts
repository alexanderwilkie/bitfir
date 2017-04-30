import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { DeviceOrientation, DeviceOrientationCompassHeading, Geolocation, Geoposition } from 'ionic-native';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class PositionData {

	currentLatitude: number;
	currentLongitude: number;

	// Rotation around the z axis -- that is, twisting the device -- causes the alpha 
	// rotation angle to change
	currentAlpha: number;

	// Rotation around the x axis -- that is, tipping the device away from or toward the user 
	// causes the beta rotation angle to change
	currentBeta: number;

	// Rotation around the Y axis -- that is, tilting the device toward the left or right 
	// causes the gamma rotation angle to change
	currentGamma: number; 

	currentMagneticHeading: number;

	constructor(public events: Events, public storage: Storage) {
		Geolocation.watchPosition().subscribe((pos: Geoposition) => {
			this.currentLatitude = pos.coords.latitude;
			this.currentLongitude = pos.coords.longitude;
		});

		if ((<any>window).DeviceOrientationEvent) {
			console.log("Device Orientation Supported!");

			let o = Observable.fromEvent(window, 'deviceorientation').subscribe((event: any) => {
				this.currentAlpha = event.alpha;
				this.currentBeta = event.beta;
				this.currentGamma = event.gamma;
			});
			
			o = DeviceOrientation.watchHeading().subscribe((data: DeviceOrientationCompassHeading) => {	
				this.currentMagneticHeading = data.magneticHeading
			});
		} else {
			console.log("Sorry, your browser doesn't support Device Orientation");
		}
	}
}