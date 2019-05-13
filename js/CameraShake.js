class CameraShake{

	constructor(camera, intensity){
		this.camera = camera;
		this.shakeIntensity = intensity;
		this.shakeDuration = 1;

		this.shaking = false;
		this.originalCamPos = new THREE.Vector3();
		this.originalCamPos.copy(this.camera.position); 
        this.clock = new THREE.Clock();
	}

	handleScreenShake(){
		if(this.shaking == true){
		
			var newCamPos = new THREE.Vector3();
			newCamPos.copy(this.originalCamPos);


			//Create a point within a unit sphere
			var randX = Math.random()*2 - 1; //Randomise a point between -1 and 1
			var randY = Math.random()*2 - 1; //Randomise a point between -1 and 1
			var randZ = Math.random()*2 - 1; //Randomise a point between -1 and 1

			//Constantly set camera to new position near its original position every frame to create shake effect
			this.camera.position.x = newCamPos.getComponent(0) + randX*this.shakeIntensity;
			this.camera.position.y = newCamPos.getComponent(1) + randY*this.shakeIntensity;
			this.camera.position.z = newCamPos.getComponent(2) + randZ*this.shakeIntensity; 

			//console.log("X: "+this.camera.position.getComponent(0)+"Y: "+this.camera.position.getComponent(1)+"Z: "+this.camera.position.getComponent(2));

			if(this.clock.getElapsedTime() >=  this.shakeDuration){ //Shake for duration set
				this.camera.position.copy(this.originalCamPos); //Reset camera back to initial position before it started shaking
				this.shaking = false; //Stop shaking
			}
		}
	}

	shakeScreen(duration){
		this.clock.start();
		this.shakeDuration = duration;
		this.shaking = true;
	}

}