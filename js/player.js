class PlayerBall {
    
    // colour is of the form "blue","red" or "yellow"
    // position is the position in the detination array
    constructor(colour,position) {
        this.colour = colour;
        this.position = position;
        this.isMoving = false;

        // what direction is the player moving
        this.controls = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false
        };
    
        // the positions that a block might occupy
        this.destinations = [-10,-5,0,5,10];
        this.dest = position;

        var geometry = new THREE.SphereGeometry( 1.5, 32, 32 );
        var material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa, 
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 0.8,
                                                        side: THREE.DoubleSide
                                                        } );
        this.sphere = new THREE.Mesh( geometry, material );

        this.sphere.position.set(this.destinations[this.dest],0,0);

        if(colour == "red")
        {
            this.sphere.material.emissive.setHex(0xdd0000);
        }
        else if (colour == "blue")
        {
            this.sphere.material.emissive.setHex(0x0000dd);
        }
        else if (colour == "yellow")
        {
            this.sphere.material.emissive.setHex(0xdddd00);
        }
    }

    handleMovement()
    {
        // check if the player wants to move and isn't already moving
        if(this.isMoving == false)
        {
            if (this.controls.moveLeft == true)
            {
                // we only want to move if the player isnt in the leftmost lane
                if(this.dest > 0)
                {
                    this.dest = this.dest - 1;
                }
            }
            else if (this.controls.moveRight == true)
            {
                // same idea as bove but for the rightmost lane
                if(this.dest < 4)
                {
                    this.dest = this.dest + 1;
                }
            }
        }
        
        
        // we don't want to just jump to the next position so we move there over time 
        if (this.sphere.position.x > this.destinations[this.dest] )
        {
            this.sphere.translateX(-0.5);
        }
        else if (this.sphere.position.x < this.destinations[this.dest])
        {
            this.sphere.translateX(+0.5);
        }

        // THIS SOLVES A BUG. PLZ DONT REMOVE
        var close_enough = Math.abs(this.sphere.position.x - this.destinations[this.dest]) < 0.1;

        // check if we've reached our destination
        if(close_enough)
        {
            this.isMoving = false;
            //console.log("stopped");
        }
        else
        {
            this.isMoving = true;
            //console.log("in motion");
        }

        //console.log(this.colour);
        //console.log(this.dest);
        //console.log(this.sphere.position.x);
    }

    // a getter for the mesh
    get_mesh()
    {
        return this.sphere;
    }
}