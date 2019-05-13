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
/*
		let formats = {
            astc: renderer.extensions.get( 'WEBGL_compressed_texture_astc' ),
            etc1: renderer.extensions.get( 'WEBGL_compressed_texture_etc1' ),
            s3tc: renderer.extensions.get( 'WEBGL_compressed_texture_s3tc' ),
            pvrtc: renderer.extensions.get( 'WEBGL_compressed_texture_pvrtc' )
        };

        let geometry = new THREE.BoxBufferGeometry( 2.5, 2.5, 2.5 );
        let loader = new THREE.KTXLoader();
        var material;

        // check if s3tc
        if ( formats.s3tc ) {
			material = new THREE.MeshBasicMaterial( {
				map: loader.load( 'assets/textures/compressed/lensflare_BC3.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );
		    this.mesh = new THREE.Mesh( geometry, material );
        }
        
        // etc1 
		if ( formats.etc1 ) {
			material = new THREE.MeshBasicMaterial( {
				map: loader.load( 'assets/textures/compressed/disturb_ETC1.ktx' )
			} );
			this.mesh = new THREE.Mesh( geometry, material );
        }
        
        // astc
		if ( formats.astc ) {
			material = new THREE.MeshBasicMaterial( {
				map: loader.load( 'assets/textures/compressed/lensflare_ASTC8x8.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );
			this.mesh = new THREE.Mesh( geometry, material );
        }
        
        // check if pvrtc
        if ( formats.pvrtc ) {
            material = new THREE.MeshBasicMaterial( {
                map: loader.load( 'assets/textures/compressed/lensflare_PVR4bpp.ktx' ),
                depthTest: false,
                transparent: true,
                side: THREE.DoubleSide
            } );
            this.mesh = new THREE.Mesh( geometry, material );
        } 
        */
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

/*
var geometry = new THREE.BoxGeometry(2.5 , 2.5, 2.5 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ffff, //Power up will be cyan in colour for now
												emissive: 0xffffff,
												emissiveIntensity: 1,
												side: THREE.DoubleSide
												} );
this.mesh = new THREE.Mesh( geometry, material );
*/