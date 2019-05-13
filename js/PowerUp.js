class PowerUp{

	constructor(){

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

		var geometry = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );
        var material = new THREE.MeshPhongMaterial( { color: 0x00ffff, //Power up will be cyan in colour for now
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 1,
                                                        side: THREE.DoubleSide
                                                        } );
        this.mesh = new THREE.Mesh( geometry, material );
		
	}

	handleMovement(){
		delta = globalDelta;
		//Rotate power up
		this.mesh.rotation.x += 0.03;
		this.mesh.rotation.y += 0.03;
		this.mesh.rotation.z += 0.03;
	}

	get_mesh(){
		return this.mesh;
	}


}