class BlockObstacle{

    // colour is of the form "blue","red","yellow","purple","orange","green","white" and "grey"
    // position is the position in the destination array
    // type dictates the behaviour of the block ("standard", "moving" (side to side movement, "fast"))
    constructor(colour, position, type){
        this.colour = colour;
        this.type = type;

        // the positions that a block will spawn occupy
        this.destinations = [-10,-5,0,5,10];
        this.dest = position;
        this.size = 4;

        var geometry = new THREE.BoxGeometry( this.size, 3, 3 );
        var material = new THREE.MeshLambertMaterial( { color: 0x444444, 
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 1,
                                                        side: THREE.DoubleSide
                                                        } );
        this.mesh = new THREE.Mesh( geometry, material );

        this.mesh.position.set(this.destinations[this.dest],0,0); //Alter intial starting z-position with playtesting

        //Change the block to the colour it was assigned
        switch(colour){
            case "grey":
                this.mesh.material.emissive.setHex(0x444444);
                break;
            case "blue":
                this.mesh.material.emissive.setHex(0x0000dd);
                break;

            case "red":
                this.mesh.material.emissive.setHex(0xdd0000);
                break;

            case "yellow":
                this.mesh.material.emissive.setHex(0xdddd00);
                break;

            case "purple":
                this.mesh.material.emissive.setHex(0xdd00dd);
                break;

            case "orange":
                this.mesh.material.emissive.setHex(0xdd7000);
                break;

            case "green":
                this.mesh.material.emissive.setHex(0x00dd00);
                break;

            case "white":
                this.mesh.material.emissive.setHex(0xcccccc);
                break;

        }
    }

    handleMovement(){
        if(this.type == "moving"){
            //move in a sin wave from x = -5 and x = 5
        }
    }

    // a getter for the mesh
    get_mesh()
    {
        return this.mesh;
    }
}