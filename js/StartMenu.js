class HomeBall {

    // colour is of the form "blue","red" or "yellow"
    // position is the position in the detination array
    /*
    state 0- is the initail start menu
    state 1- play has been clicked
    state 2- how to play has been clicked
    state 3- settings has been clicked
    */
    constructor(colour, position, state) {
        this.colour = colour;
        this.position = position;
        this.isReady = false;
        this.state = state;


        this.controls = {
            pressReady: false
        };
        var geometry = new THREE.SphereGeometry(65, 32, 32);
        var material = new THREE.MeshLambertMaterial({
            color: 0xaaaaaa,
            emissive: 0xffffff,
            emissiveIntensity: 10,
            side: THREE.DoubleSide
        });
        this.sphere = new THREE.Mesh(geometry, material);

        this.sphere.position.set(position, 100, 10);

        if (colour == "red") {
            this.sphere.material.emissive.setHex(0xdd0000);
        } else if (colour == "blue") {
            this.sphere.material.emissive.setHex(0x0000dd);
        } else if (colour == "yellow") {
            this.sphere.material.emissive.setHex(0xdddd00);
        }
    }

    objectClickHandler() {
        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshLambertMaterial({
            color: 0x444444,
            emissive: 0xffffff,
            emissiveIntensity: 1,
            side: THREE.DoubleSide
        });
        this.sphere = new THREE.Mesh(geometry, material);
    }
    handleState() {
        // check if the player wants to move and isn't already moving
        if (this.isReady == false) {
            if (this.controls.pressReady == true) {
                //change the object
                isReady = true;

            }

        }
    }
    readyState() {
        this.isReady = true;
    }
    set_colour(col) {
        this.colour = col;

        switch (col) {
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
    }
    get_colour() {
        return this.colour;
    }

    // a getter for the mesh
    get_mesh() {
        return this.sphere;
    }
    get_State() {
        return this.state;
    }
    update_state(newState) {
        this.state = newState;
    }
}