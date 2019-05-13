var moveDirection = new THREE.Vector3();
var delta = 0;
var canJump = false; //Global jump boolean controlled by power up

class PlayerBall {
    
    // colour is of the form "blue","red" or "yellow"
    // position is the position in the detination array
    constructor(colour,position, type) {
        if (type === undefined)
        {
            type = 0;
        } 
        this.type = type;
        this.colour = colour;
        this.position = position;
        this.isMoving = false;
        this.isJumping = false;
        this.isFalling = false;

        // what direction is the player moving
        this.controls = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false
        };
    
        // the positions that a block might occupy
        this.xDestinations = [-10,-5,0,5,10];
        this.zDestinations = [0, -7.5];
        this.xDest = position;
        this.zDest = 0; //Either 0 or 1
        this.destVector = new THREE.Vector3(this.xDestinations[position],0,this.zDestinations[0]);
        this.default_dest = this.xDest;

        this.group = new THREE.Group();
        this.size = 1.5;
        this.moveSpeed = 25;

        


        if (this.type == 0) 
        {
            var geometry = new THREE.SphereGeometry( this.size, 16, 16 );
            var material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, 
                                                            emissive: 0xffffff,
                                                            emissiveIntensity: 1,
                                                            side: THREE.DoubleSide
                                                            } );
            this.sphere = new THREE.Mesh( geometry, material );
    
            this.group.add(this.sphere); 
        }
        else if (this.type == 1) 
        {
            this.size = 1.5/2;
            var geometry = new THREE.SphereGeometry( this.size, 16, 16 );
            var material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, 
                                                            emissive: 0xffffff,
                                                            emissiveIntensity: 1,
                                                            side: THREE.DoubleSide
                                                            } );
            this.sphere = new THREE.Mesh( geometry, material );
    
            this.group.add(this.sphere); 
            this.electron_scale = this.size/8;
            this.orbit_radius = this.size*1.5 + this.electron_scale*2;
            this.electron_speed = 2*Math.PI*this.orbit_radius/7;
            this.electrons = new THREE.Group();
            this.v_electrons = new THREE.Group();
            this.h_electrons = new THREE.Group();
            this.d1_electrons = new THREE.Group();
            this.d2_electrons = new THREE.Group();
            this.electrons.add(this.h_electrons);
            this.electrons.add(this.v_electrons);
            this.electrons.add(this.d1_electrons);
            this.electrons.add(this.d2_electrons);
            this.group.add(this.electrons);

            this.v_electrons.rotateZ(2*Math.PI/4);
            this.d1_electrons.rotateZ(Math.PI/4);
            this.d2_electrons.rotateZ(-Math.PI/4);
            for (var k = 0; k < 4; k++) {
                var electron = this.make_electron();
                switch (k%4) {
                    case 0:
                        this.h_electrons.add(electron)
                        break;
                    case 1:
                        this.v_electrons.add(electron)
                        break;
                    case 2:
                        this.d1_electrons.add(electron)
                        break;
                    case 3:
                        this.d2_electrons.add(electron)
                        break;
                
                    default:
                } 
                
            }
        }
        else if(this.type == 2)
        {
            var texture = new THREE.TextureLoader().load( "assets/textures/moonb.jpg" );
            var geometry = new THREE.SphereGeometry( this.size, 16, 16 );
            var material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, 
                                                            emissive: 0xffffff,
                                                            emissiveIntensity: 1,
                                                            side: THREE.DoubleSide
                                                            } );
            material.map = texture;
            this.sphere = new THREE.Mesh( geometry, material );
    
            this.group.add(this.sphere); 
        }

        
        


        // player shadow settings
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = false; // receive shadow for player false for prominent player

        
        this.group.position.set(this.destVector.getComponent(0),0,0);

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
                if(this.xDest > 0)
                {
                    this.xDest = this.xDest - 1;
                    this.destVector.setComponent(0, this.xDestinations[this.xDest]); //Update Destination vector
                }
            }
            else if (this.controls.moveRight == true)
            {
                // same idea as bove but for the rightmost lane
                if(this.xDest < 4)
                {
                    this.xDest = this.xDest + 1;
                    this.destVector.setComponent(0, this.xDestinations[this.xDest]); //Update Destination vector
                }
            }
            if(this.controls.moveForward == true){
                // we only want to move if player is in the bottom lane
                if(this.zDest == 0){
                    console.log("moving forward");
                    this.zDest = 1;
                    this.destVector.setComponent(2, this.zDestinations[1]); //Update Destination vector
                }
            }
            else if(this.controls.moveBackward == true){
                // we only want to move if player is in the top lane
                if(this.zDest == 1){
                    console.log("moving backward");
                    this.zDest = 0;
                    this.destVector.setComponent(2, this.zDestinations[0]); //Update Destination vector
                }
            }
        }
        
        delta = globalDelta;
        // we don't want to just move to the next position so we move there over time 
        if (this.group.position.x > this.destVector.getComponent(0) )
        {
            moveDirection.set(-1,0,0);
            this.group.position.addScaledVector(moveDirection, this.moveSpeed*delta);
        }
        else if (this.group.position.x < this.destVector.getComponent(0))
        {
            moveDirection.set(1,0,0);
            this.group.position.addScaledVector(moveDirection, this.moveSpeed*delta);
        }

        if(this.group.position.z > this.destVector.getComponent(2)){
            moveDirection.set(0,0,-1);
            this.group.position.addScaledVector(moveDirection, this.moveSpeed*delta);
        }
        else if(this.group.position.z < this.destVector.getComponent(2)){
            moveDirection.set(0,0,1);
            this.group.position.addScaledVector(moveDirection, this.moveSpeed*delta);
        }

        // THIS SOLVES A BUG. PLZ DONT REMOVE
        var close_enough = Math.abs(this.group.position.x - this.destVector.getComponent(0)) < 0.1  && Math.abs(this.group.position.z - this.destVector.getComponent(2)) < 0.1;

        // check if we've reached our destination
        if(close_enough)
        {
            this.isMoving = false;
            this.group.position.set(this.destVector.getComponent(0),this.group.position.getComponent(1),this.destVector.getComponent(2));
            //console.log("stopped");
        }
        else
        {
            this.isMoving = true;
            //console.log("in motion");
        }

        if(this.isJumping == true){
            var jumpSpeed = 15;
            if(this.isFalling == false){ //Ball is in upward motion of jump
                if(this.group.position.y < 8){
                moveDirection.set(0,1,0);
                this.group.position.addScaledVector(moveDirection, jumpSpeed*delta);

                    close_enough = (Math.abs(this.group.position.y - 8) < 0.2);
                    if(close_enough == true){
                        this.isFalling = true;
                    }

                }
            }
            else if(this.isFalling == true){ //Ball is in downward motion of jump
                if(this.group.position.y > 0){
                    moveDirection.set(0,-1,0);
                    this.group.position.addScaledVector(moveDirection, jumpSpeed*delta);
                    close_enough = (Math.abs(this.group.position.y) < 0.2);
                    if(close_enough == true){
                        this.isFalling = false;
                        this.isJumping = false;
                    }

                }
            }

        }

        this.handleAnimation();
        //console.log(this.colour);
        //console.log(this.xDest);
        //console.log(this.sphere.position.x);
    }

    set_colour(col){
        this.colour = col;

        switch(col){
            case "blue":

                this.sphere.material.emissive.setHex(0x0000dd);
                break;
            case "red":
                this.sphere.material.emissive.setHex(0xdd0000);
                break;
            case "yellow":
                this.sphere.material.emissive.setHex(0xdddd00);
                break;
            case "green":
                this.sphere.material.emissive.setHex(0x00dd00);
                break;
            case "orange":
                this.sphere.material.emissive.setHex(0xce6800);
                break;
            case "purple":
                this.sphere.material.emissive.setHex(0xdd00dd);
                break;
            case "white":

                this.sphere.material.emissive.setHex(0xcccccc);
                break; 
        }

        if (this.type == 1)
        {
            for (var i = 0; i < this.electrons.children.length; i++) 
            {
                for (var k = 0; k < this.electrons.children[i].length; k++) 
                {
                    this.electrons.children[i].children[k].material.emissive.copy(this.sphere.meterial.emissive);
                }
            }
        }

    }
    get_colour(){
        return this.colour;
    }

    // a getter for the mesh
    get_mesh()
    {
        return this.sphere;
    }

    get_destVector(){
        return this.destVector;
    }

    reset_position()
    {
        this.group.position.x = this.xDestinations[this.default_dest]
        this.group.position.y = 0;
        this.group.position.z = 0;
        this.xDest = this.default_dest;
    }

    initiateJump(){
        if(this.isJumping == false){
            this.isJumping = true;
        }
    }

    make_electron()
    {
        var smol_geometry = new THREE.SphereGeometry( this.size/8, 16, 16 );
        /*
        var smol_material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, 
            emissive: 0xffffff,
            emissiveIntensity: 1,
            side: THREE.DoubleSide
            } );
        */

        var smol_material = this.sphere.material;

        var electron = new THREE.Mesh( smol_geometry, smol_material );

        var theta = Math.random()*Math.PI*2;
        var phi = Math.random()*Math.PI*2;

        electron.position.x = this.orbit_radius*Math.cos(theta) * Math.sin(theta+phi);
        electron.position.y = this.orbit_radius*Math.sin(theta) * Math.sin(theta+phi);
        electron.position.z = this.orbit_radius*Math.cos(phi) ;


        return electron;
    }


    handleAnimation()
    {
        if (this.type == 1)
        {
            var num_electrons = this.electrons.children.length;
            for (var i = 0; i < num_electrons; i++) 
            {
                var curr_orbital = this.electrons.children[i];
                for (var k = 0; k < curr_orbital.children.length; k++) {
                    var curr_electron = curr_orbital.children[k];
                    var phi = frameNumber/10 + (k/num_electrons)*2*Math.PI;
                    var theta = (k/num_electrons)*2*Math.PI;
                    if (i%2 == 0) 
                    {
                        phi = phi + i;
                    }
                    else{
                        phi = phi + i;
                    }
                    curr_electron.position.x = this.orbit_radius*Math.cos(theta) * Math.sin(phi);
                    curr_electron.position.y = this.orbit_radius*Math.sin(theta) * Math.sin(phi);
                    curr_electron.position.z = this.orbit_radius*Math.cos(phi) ;
                        
                }           
            }
        }
        
    }



}