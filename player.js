class PlayerBall {
    

    // colour is of the form "red","green" or "blue"
    // position is the position in the detination array
    constructor(colour,position) {
        this.colour = colour;
        this.position = position;

        this.controls = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false
        };
    
        this.destinations = [-10,-5,0,5,10];
    
    
        this.dest = 3;

        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        var material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa, 
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 1,
                                                        side: THREE.DoubleSide
                                                        } );
        this.sphere = new THREE.Mesh( geometry, material );
        this.sphere.scale.set(0.5,0.5,0.5);

        if(colour == "red")
        {
            this.sphere.material.emissive.setHex(0xff0000);
        }
        else if (colour == "blue")
        {
            this.sphere.material.emissive.setHex(0x0000ff);
        }
        else if (colour == "green")
        {
            this.sphere.material.emissive.setHex(0x00ff00);
        }
    }

    handleMovement()
    {
        if (red_ball.position.x > destinations[dest])
        {
            red_ball.translateX(-1);
        }
        else if (red_ball.position.x < destinations[dest])
        {
            red_ball.translateX(1);
        }
    }

    get_model()
    {
        return this.sphere;
    }
}