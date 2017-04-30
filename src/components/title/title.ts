import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { CreateBitfirPage } from '../../pages/bitfir-detail/bitfir-create';

@Component({
    selector: 'bitfir-title',
    template: `
<ion-navbar>
	<ion-item>
		<ion-avatar item-left>
			<img src="{{ userData.user?.photoURL }}">
		</ion-avatar>
	</ion-item>

	<ion-title>
		¥
	</ion-title>

	<ion-buttons end>
		<button ion-button icon-only (click)="openCreateBitfirModal()">
			<ion-icon name="add"></ion-icon>
		</button>
	</ion-buttons>
</ion-navbar>
`
})
export class TitleComponent {
    constructor(public modalCtrl: ModalController, public userData: UserData) {}

	openCreateBitfirModal() {
		let modal = this.modalCtrl.create(CreateBitfirPage);
		modal.present();
	}
}
