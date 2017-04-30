/*
	
Facebook.getAccessToken(function(token) {
				// Authenticate with Facebook using an existing OAuth 2.0 access token
				var credential = this.auth.FacebookAuthProvider.credential(token);
				this.auth.signInWithCredential(credential).then(function(result) {
					// The firebase.User instance:
					var user = result;
					console.log('User :'+JSON.stringify(user));
				}, function(error) {
					// Check error.code and error.message
					// Possible error is auth/account-exists-with-different-credential to fetch the providers ???
					// In case of auth/account-exists-with-different-credential error,
					// you can fetch the providers using this:
					if (error.code === 'auth/account-exists-with-different-credential') {
						firebase.auth().fetchProvidersForEmail(error.email).then(function(providers) {
							// The returned 'providers' is a list of the available providers
							// linked to the email address. Please refer to the guide for a more
							// complete explanation on how to recover from this error.
						});
					}
				});
			}, function(error) {
				console.log('Could not get access token', error);
			},


ionViewDidLoad(){

	  	takePicture(){
		Camera.getPicture({
			destinationType: Camera.DestinationType.DATA_URL,
			targetWidth: 1000,
			targetHeight: 1000
		}).then((imageData) => {
			// imageData is a base64 encoded string
			this.base64Image = "data:image/jpeg;base64," + imageData;
		}, (err) => {
	    	console.log(err);
		});
  	}
	console.log("ionVidddewDidLoad");

	var imgDetectionPlugin = (<any>window).plugins.ImageDetectionPlugin || new ImageDetectionPlugin();

	imgDetectionPlugin.startProcessing(true, function(success){
		console.log("imgDetectionPlugin.startProcessing - success");
		console.log(success);
	}, function(error){
		console.log("imgDetectionPlugin.startProcessing - error");
		console.log(error);
	});

	imgDetectionPlugin.isDetecting(function(success){
		console.log("imgDetectionPlugin.isDetecting - success");
		console.log(success);
		var resp = JSON.parse(success);
		console.log(resp.index, "image detected - ", indexes[resp.index]);
	}, function(error){
		console.log("imgDetectionPlugin.isDetecting - error");
		console.log(error);
	});

	function setAllPatterns(patterns) {
		console.log("setAllPatterns");
		imgDetectionPlugin.setPatterns(patterns, function(success){console.log(success);}, function(error){console.log(error);});
	}

	var loadAllImg = 0;
	var patternsHolder = [];
	var indexes = {};
	var limit = 2;

	function ToDataURL (self) {
		console.log("ToDataURL");

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var dataURL;

		canvas.height = self.height;
		canvas.width = self.width;
		ctx.drawImage(self, 0, 0);
		dataURL = canvas.toDataURL("image/jpeg", 0.8);
		patternsHolder.push(dataURL);
		indexes[loadAllImg] = self.src.substr(self.src.lastIndexOf("/") + 1);
		loadAllImg += 1;
		console.log("!!!", loadAllImg, indexes);
		
		if(loadAllImg == limit){
			console.log("patterns set", patternsHolder);
			setAllPatterns(patternsHolder);
		}
		canvas = null;
	}

	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.onload = function(){
	  ToDataURL(this)
	};
	img.src = "img/patterns/pattern.png";

	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.onload = function(){
	  ToDataURL(this)
	};
	img.src = "img/patterns/tree.jpg";

	imgDetectionPlugin.setDetectionTimeout(2, function(success){
		console.log("imgDetectionPlugin.setDetectionTimeout - success");
		console.log(success);
	}, function(error){
		console.log("imgDetectionPlugin.setDetectionTimeout - error");
		console.log(error);
	});		
}
*/