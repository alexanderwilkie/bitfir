import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ViewController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { PositionData } from '../../providers/position-data';

import { BitFir, BitFirLocation, BitFirOrientation } from '../../models/bitfir-model';

import * as firebase from 'firebase';

@Component({
	templateUrl: 'bitfir-create.html'
})
export class CreateBitfirPage {

	createBitfirFormGroup: FormGroup;

	constructor(
		public userData: UserData, public posData: PositionData, 
		public viewCtrl: ViewController, private formBuilder: FormBuilder
	) {
		this.createBitfirFormGroup = formBuilder.group({
			title: ['', Validators.required],
		});
	}

	logForm() {
		if(!this.createBitfirFormGroup.valid) {
			console.log("Not valid!");
		}

		let title = this.createBitfirFormGroup.value.title;
		var b = new BitFir(
			title, 
			new BitFirLocation(
				this.posData.currentLatitude, this.posData.currentLongitude
			),
			new BitFirOrientation(
				this.posData.currentAlpha, this.posData.currentBeta, this.posData.currentGamma, this.posData.currentMagneticHeading
			)
		);
		
		b.store(this.userData.user.uid);
		this.dismiss();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}