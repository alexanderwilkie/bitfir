import { Component } from '@angular/core';
import { Subscription } from 'rxjs/rx';

import { NavController, NavParams } from 'ionic-angular';
import { CameraPreview, Geolocation } from 'ionic-native';

import { UserData } from '../../providers/user-data';
import { PositionData } from '../../providers/position-data';

import { BitFir, BitFi } from '../../models/bitfir-model';
import { CreateBitfiPage } from './bitfi-create';


@Component({
	selector: 'page-bitfir-detail',
	templateUrl: 'bitfir-detail.html'
})
export class BitfirDetailPage {

	bitfir: BitFir;
	
	constructor(
		public userData: UserData, public posData: PositionData, 
		public navCtrl: NavController, private navParams: NavParams
	) {
		this.bitfir = this.navParams.get('bitfir');
	}

	deleteBitfir(event, bitfir: BitFir) {

		bitfir.delete(this.userData.user.uid);
		this.navCtrl.pop();
	}

	addBitFi(event, bitfir: BitFir) {
  		this.navCtrl.push(CreateBitfiPage, {bitfir: bitfir}, {animate: false});
	}
}
