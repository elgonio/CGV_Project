class PowerUp{

	constructor(moveSpeed){

		this.moveSpeed = moveSpeed;//speed at which the power up moves down the track

		var randNum = Math.floor(Math.random()*4 + 1) //Randomise number between 1 and 3
		switch(randNum){
			case 1: //Jump ability
				this.type = "Jump";
				break;
			case 2: //Screenshake
				this.type = "Screenshake";
				break;
			case 3: //Invert Camera View
				this.type = "Invert";
				break;
		}

		this.geometry = new THREE.BoxGeometry( 3, 3, 3 );
        var material = new THREE.MeshPhongMaterial( { color: 0x00ffff, //Power up will be cyan in colour for now
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 1,
                                                        side: THREE.DoubleSide
                                                        } );
        this.mesh = new THREE.Mesh( this.geometry, material );
        this.mesh.position.set(0,0,-20);
        console.log("Power Up Pos: "+this.mesh.position);
		
	}

	handleMovement(){
		delta = globalDelta;
		//Rotate power up
		this.mesh.rotation.x += 0.03;
		this.mesh.rotation.y += 0.02;
		this.mesh.rotation.z += 0.01;

		this.mesh.position.addScaledVector(new THREE.Vector3(0,0,1), this.moveSpeed*delta); //make power up move down the track when it spawns

	}

	get_mesh(){
		return this.mesh;
	}

	dispose(){
		console.log("disposed powerup");
		this.geometry.dispose(); //Deletes object from memory
	}
}