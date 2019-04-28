class block{

	// colour is of the form "blue","red","yellow","purple","orange","green","white" and "grey"
	// position is the position in the destination array
	// type dictates the behaviour of the block ("standard", "moving" (side to side movement, "fast"))
	constructor(colour, position, type){
		this.colour = colour;
		this.type = type;

		// the positions that a block will spawn occupy
        this.destinations = [-10,-5,0,5,10];
        this.dest = position;

		var geometry = new THREE.BoxGeometry( 3, 3, 3 );
        var material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa, //Default is grey 
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 1
                                                        } );
		this.mesh = new THREE.Mesh( geometry, material );

        this.mesh.position.set(this.destinations[this.dest],0,50); //Alter intial starting z-position with playtesting

        //Change the block to the colour it was assigned
        switch(colour){
        	case "grey":
	            this.sphere.material.emissive.setHex(0xaaaaaa);
        		break;
        	case "blue":
	            this.sphere.material.emissive.setHex(0x0000ff);
        		break;

        	case "red":
        		this.sphere.material.emissive.setHex(0xff0000);
        		break;

        	case "yellow":
        		this.sphere.material.emissive.setHex(0xffff00);
        		break;

        	case "purple":
        		this.sphere.material.emissive.setHex(0xff00ff);
        		break;

        	case "orange":
        		this.sphere.material.emissive.setHex(0xff7f00);
        		break;

        	case "green":
        		this.sphere.material.emissive.setHex(0x00ff00);
        		break;

    		case "white":
    			this.sphere.material.emissive.setHex(0xffffff);
        		break;

        }
	}

	handleMovement(){
		if(this.type == "standard"){
			//Move down the track
	        if (this.mesh.position.z > 0 )
	        {
	            this.mesh.translateZ(-0.5); // NEED TO CHANGE THIS TO MATCH SPEED WITH AND PLAY TEST THE HELL OUT OF THIS
	        }
   	 	}
   	 	else if(this.type == "moving"){
   	 		//move in a sin wave from x = -5 and x = 5
   	 	}
   	 	else if(this.type == "fast"){
   	 		//a single block charges straight down the track (overtakes previously instantiated rows)
   	 	}
	}

    // a getter for the mesh
    get_mesh()
    {
        return this.mesh;
    }
}