import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BitfirDetailPage } from '../pages/bitfir-detail/bitfir-detail';
import { CreateBitfirPage } from '../pages/bitfir-detail/bitfir-create';
import { CreateBitfiPage } from '../pages/bitfir-detail/bitfi-create';

import { UserDetailPage } from '../pages/user-detail/user-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { TitleComponent } from '../components/title/title';

import { UserData } from '../providers/user-data';
import { PositionData } from '../providers/position-data';

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		HomePage,
		LoginPage,
		BitfirDetailPage,
		CreateBitfirPage,
		CreateBitfiPage,
		UserDetailPage,
		TabsPage,
		TitleComponent
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		HomePage,
		LoginPage,
		BitfirDetailPage,
		CreateBitfirPage,
		CreateBitfiPage,
		UserDetailPage,
		TabsPage,
		TitleComponent
	],
	providers: [Storage, UserData, PositionData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
