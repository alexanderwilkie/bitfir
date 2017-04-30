import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { PositionData } from '../../providers/position-data';

import { BitfirDetailPage } from '../bitfir-detail/bitfir-detail';
import { BitFir } from '../../models/bitfir-model';

declare var google;

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mapElement: ElementRef;
  	map: any;

  	bitfirs: BitFir[];

	constructor(
		public navCtrl: NavController, public platform: Platform, 
		public userData: UserData, public posData: PositionData
	) {}

	ionViewWillEnter() {
		var l = Math.min(5, this.userData.bitFirs.length);
		console.log(l);
		this.bitfirs = this.userData.bitFirs;
		//BitFirLocation.sortBitFirsByLocation(
		//	this.userData.bitFirs, this.posData.currentLatitude, this.posData.currentLongitude
		//).slice(0, l);
	}

	/*
  	ionViewDidLoad(){
	  	console.log("ionViewDidLoad");

	  	this.platform.ready().then(() => {
			Geolocation.getCurrentPosition().then(pos => {
				this.currentLocation = pos.coords;
				//this.loadMap();
			}).catch(err => {
		      console.log(err);
		    });
	   	});
  	}
  	*/

  	loadBitfirDetails(event, bitfir) {
  		this.navCtrl.push(BitfirDetailPage, {bitfir: bitfir}, {animate: true});
  	}
 
  	loadMap(){
	 	console.log("loadMap");

	    let latLng = new google.maps.LatLng(this.posData.currentLatitude, this.posData.currentLongitude);
	    let mapOptions = {
    		scrollwheel: false,
    		draggable: false,
			center: latLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

	    var markers = [];
	    markers.push(new google.maps.Marker({
	        position: new google.maps.LatLng(this.posData.currentLatitude, this.posData.currentLongitude), 
	        map: this.map,
	        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	    }));

	    var infowindow = new google.maps.InfoWindow();

	    for (let bitfir of this.bitfirs) {

		    var m = new google.maps.Marker({
		        position: new google.maps.LatLng(bitfir.location.latitude, bitfir.location.longitude), 
		        map: this.map,
		        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
		    });

			google.maps.event.addListener(m, 'click', (function(m, i) {
				return function() {
				    var contentString = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading" class="firstHeading">'+bitfir.name+'</h1>'+
					'<div id="bodyContent">'+
					'<img src="'+bitfir.keyBitFi.imagePath+'" width="160px"/>'+
					'<p>'+bitfir.location.latitude+', '+bitfir.location.longitude+'</p>'+
					'</div>'+
					'</div>';
					infowindow.setContent(contentString);
					infowindow.open(this.map, m);
				}
			})(m, i));
	        markers.push(m);
		}

		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < markers.length; i++) {
			bounds.extend(markers[i].getPosition());
		}

		this.map.fitBounds(bounds);
  	}
}
