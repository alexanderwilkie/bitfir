import * as firebase from 'firebase';

export class BitFirLocation {
	constructor(public latitude: number, public longitude: number) {}

    static sortBitFirsByLocation(bitfirs: BitFir[], latitude: number, longitude: number): BitFir[] {
		console.log('BitFirLocation.sortBitFirsByLocation');

		return bitfirs.sort((a, b) => {
			return a.location.getDistanceFrom(latitude, longitude) - b.location.getDistanceFrom(latitude, longitude);
		});
	}

	getDistanceFrom(latitude: number, longitude: number): number {

		var R = 6371; // Radius of the earth in km
		var dLat = (this.latitude - latitude) * (Math.PI/180);  // deg2rad
		var dLon = (this.longitude - longitude) * (Math.PI/180);
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(latitude * (Math.PI/180)) * Math.cos(this.latitude * (Math.PI/180)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return Math.round((R * c) * 1e3) / 1e3; // Distance in km
	}

	serialize() {
		console.log('BitFirLocation.serialize');

		return { 
			latitude: this.latitude,
			longitude: this.longitude
		}
	}	
}

export class BitFirOrientation {
	constructor(public alpha: number, public beta: number, public gamma: number, public magneticHeading: number) {}

    static rnd(x: number) {
		return Math.round(x * 10) / 10;
    }

    serialize() {
		return {
			alpha: this.alpha,
			beta: this.beta,
			gamma: this.gamma,
			magneticHeading: this.magneticHeading
		}    	
    }
}

export class BitFi {
	constructor(public imagePath: string) {}
}

export class BitFir {

    keyBitFi: BitFi;
    bitfis: BitFi[] = [];

    uidkey: string;
 
    constructor(public name: string, public location: BitFirLocation, public orientation: BitFirOrientation) {}

    static fromDatabase(uidkey, name, location, orientation): BitFir {
		console.log('BitFir.fromDatabase: ' + uidkey);

    	var b = new BitFir(
			name,
			new BitFirLocation(location.latitude, location.logitude),
			new BitFirOrientation(orientation.alpha, orientation.beta, orientation.gamma, orientation.magneticHeading)
						
		);
    	b.uidkey = uidkey;
    	return b;
    }

    addBitFi(imagePath: string) {
		console.log('BitFir.addBitFi: ' + this.uidkey + ': ' + imagePath);

		// Need to add image to firebase storage
    	this.bitfis.push(new BitFi(imagePath));
    }

	delete(userid: string) {
		console.log('BitFir.delete: ' + this.uidkey);
		firebase.database().ref('bitfir/' + this.uidkey).remove();
		firebase.database().ref('user-bitfirs/' + userid + '/' + this.uidkey).remove();

		// Should we store locations like this to provide a fast interface to searching?
		// firebase.database().ref('bitfir-locations/' + userid + '/' + uid.key).remove();
	}

	store(userid: string) {
		console.log('BitFir.store: ' + this.uidkey + ': ' + userid);

  		var uid = firebase.database().ref('bitfir').push();
  		uid.set({
  			"name": this.name,
  			"orientation": this.orientation.serialize(),
  			"location": this.location.serialize()
		});

		firebase.database().ref('user-bitfirs/' + userid + '/' + uid.key).set(true);
		
		// Should we store locations like this to provide a fast interface to searching?
		// firebase.database().ref('bitfir-locations/' + userid + '/' + uid.key).set(true);

		this.uidkey = uid.key;
		return uid.key;
	}
}