class block{

	// colour is of the form "blue","red","yellow","purple","orange","green"
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
		this.cube = new THREE.Mesh( geometry, material );

        this.sphere.position.set(this.destinations[this.dest],0,100);

        switch(colour){
        	case "blue":
	            this.sphere.material.emissive.setHex(0x0000ff);
        		break;

        	case "red":
        		this.sphere.material.emissive.setHex(0x0000ff);
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

        }
	}
}