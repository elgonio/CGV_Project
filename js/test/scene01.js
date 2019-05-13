// class to initialise the test scene
class SceneInit {
    constructor(scene, camera, renderer, clock) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.clock = clock;
        //this.controls = controls;
    }


    initScene() {
        // create the scene
        this.scene = new THREE.Scene();

        // create the camera
        this.camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight), 0.1, 1000 );
        this.camera.position.z = 5;
        this.camera.position.y = 1;

        // setup the renderer with the html canvas in index
        this.renderer = new THREE.WebGLRenderer(
            {canvas: document.getElementById( 'renderer' ), antialias: true} // setup antialias here
        );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        // add support for shadow mapping in renderer
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // timer and clock enabling
        this.clock = new THREE.Clock();

        // append renderer as dominant element
        document.body.appendChild( this.renderer.domElement );
    }


    // add demo cube function
    addCube() {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshPhongMaterial( { color: "rgb(20, 130, 200)", dithering: true } );
        let cube = new THREE.Mesh( geometry, material );

        // cube shadow properties
            cube.castShadow = true;
            cube.receiveShadow = false;

        // demo cube positioning
        cube.position.set( 0, 1, 2 );
        cube.rotation.x = 45;
        cube.rotation.y = 45;
    
        this.scene.add( cube );
    }


    // ktx cube demo function
    addKTXCube() {
        // ktx formats support
        let formats = {
            astc: this.renderer.extensions.get( 'WEBGL_compressed_texture_astc' ),
            etc1: this.renderer.extensions.get( 'WEBGL_compressed_texture_etc1' ),
            s3tc: this.renderer.extensions.get( 'WEBGL_compressed_texture_s3tc' ),
            pvrtc: this.renderer.extensions.get( 'WEBGL_compressed_texture_pvrtc' )
        };

        let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        let loader = new THREE.KTXLoader();
        var material;
        var meshes = [];

        // check if s3tc
        if ( formats.s3tc ) {
			material = new THREE.MeshBasicMaterial( {
				map: loader.load( 'assets/textures/compressed/lensflare_BC3.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );
		    meshes.push( new THREE.Mesh( geometry, material ) );
        }
        
        // etc1 
		if ( formats.etc1 ) {
			material = new THREE.MeshBasicMaterial( {
				map: loader.load( 'assets/textures/compressed/disturb_ETC1.ktx' )
			} );
			meshes.push( new THREE.Mesh( geometry, material ) );
        }
        
        // astc
		if ( formats.astc ) {
			material = new THREE.MeshBasicMaterial( {
				map: loader.load( 'assets/textures/compressed/lensflare_ASTC8x8.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );
			meshes.push( new THREE.Mesh( geometry, material ) );
        }
        
        // check if pvrtc
        if ( formats.pvrtc ) {
            material = new THREE.MeshBasicMaterial( {
                map: loader.load( 'assets/textures/compressed/lensflare_PVR4bpp.ktx' ),
                depthTest: false,
                transparent: true,
                side: THREE.DoubleSide
            } );
            meshes.push( new THREE.Mesh( geometry, material ) );
        }
        
        this.scene.add( meshes[0] );
        
    }
    

    // floor demo function
    addFloor() {
        let material = new THREE.MeshPhongMaterial( { color: "rgb(22, 22, 22)", dithering: true } );
        let geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        let floor = new THREE.Mesh( geometry, material );

        floor.position.set( 0, -1, 0 );
        floor.rotateX( - Math.PI / 2);
        
        // floor shadow properties
            floor.receiveShadow = true;
        
        this.scene.add( floor );
    }

    
    // water function
    addWater() {
        var params = {
			color: '#ffffff',
			scale: 4,
			flowX: 1,
			flowY: 1
        };
        
        let waterGeo = new THREE.PlaneBufferGeometry( 250, 250 );
		let water = new THREE.Water( waterGeo, {
			color: params.color,
			scale: params.scale,
			flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
			textureWidth: 1024,
			textureHeight: 1024
        } );
            
		water.position.y = ( 0 );
		water.rotation.x = ( Math.PI * (- 0.5) );
		this.scene.add( water );
    }


    /* particle system demo
    addParticles() {
        //let clock = new THREE.Clock();
        let tick = 0.0;
        let options, spawnerOptions, particleSystem;

        particleSystem = new THREE.GPUParticleSystem( {
            maxParticles: 125000
        } );

        this.scene.add( particleSystem );

        options = {
            position: new THREE.Vector3(),
            positionRandomness: 0.0,
            velocity: new THREE.Vector3(),
            velocityRandomness: 0.25,
            color: '#ffffff',
            colorRandomness: 0.2,
            turbulence: 0.6,
            lifetime: 1.2,
            size: 10,
            sizeRandomness: 1
        };

        spawnerOptions = {
            spawnRate: 15000,
            horizontalSpeed: 0.0,
            verticalSpeed: 0.0,
            timeScale: 1
        };
    }
    */


    // lights demo function
    addLight() {
        // ambient light
        let ambientLight = new THREE.AmbientLight( "rgb(240, 240, 240)", 0.50);
            ambientLight.castShadow = false;
        this.scene.add( ambientLight );

        // point light 1, blue
        let pointLight01 = new THREE.PointLight( "rgb(0, 0, 255)", 1, 20 );
            pointLight01.position.set ( -5, 5, 2 ); // x y z, - y is up down
        // point light shadow properties
            pointLight01.castShadow = true;
            pointLight01.shadow.mapSize.width = 512;
            pointLight01.shadow.mapSize.height = 512;
            pointLight01.shadow.camera.near = 0.5;
            pointLight01.shadow.camera.far = 500;
        this.scene.add( pointLight01 );

        // point light 2, red
        let pointLight02 = new THREE.PointLight( "rgb(255, 0, 0)", 1, 20 );
            pointLight02.position.set ( 0, 5, 2 );
            pointLight02.castShadow = true;
            pointLight02.shadow.mapSize.width = 512;
            pointLight02.shadow.mapSize.height = 512;
            pointLight02.shadow.camera.near = 0.5;
            pointLight02.shadow.camera.far = 500;
        this.scene.add( pointLight02 );

        // point light 3, yellow
        let pointLight03 = new THREE.PointLight( "rgb(255, 255, 0)", 1, 20 );
            pointLight03.position.set ( 5, 5, 2 );
            pointLight03.castShadow = true;
            pointLight03.shadow.mapSize.width = 512;
            pointLight03.shadow.mapSize.height = 512;
            pointLight03.shadow.camera.near = 0.5;
            pointLight03.shadow.camera.far = 500;
        this.scene.add( pointLight03 );

        // spot light 1
        let spotLight01 = new THREE.SpotLight( "rgb(100, 100, 100)", 0.5 );
            spotLight01.position.set( 0, 10, 0 );
            spotLight01.angle = ( Math.PI/4 );
            spotLight01.penumbra = 0.10;
            spotLight01.decay = 2;
            spotLight01.distance = 200;
        // spot light shadow properties
            spotLight01.castShadow = true;
            spotLight01.shadow.mapSize.width = 1024;
            spotLight01.shadow.mapSize.height = 1024;
            spotLight01.shadow.camera.near = 2;
            spotLight01.shadow.camera.far = 200;
        this.scene.add( spotLight01 );
    }


    // fog effect function 
    addFog() {
        //var fog;
        let fogColour = "#ffffff";
        let fogNear = 1;
        let fogFar = 7;
        this.scene.fog = new THREE.Fog( fogColour, fogNear, fogFar );
    }


    // animate scene
    animate() {
        requestAnimationFrame( this.animate.bind(this) );

        /* particle animation
        var delta = this.clock.getDelta() * this.spawnerOptions.timeScale;
        tick += delta;

        if ( tick < 0 ) tick = 0;

        if ( delta > 0 ) {
            this.options.position.x = Math.sin( tick * this.spawnerOptions.horizontalSpeed ) * 10;
            this.options.position.z = Math.sin( tick * this.spawnerOptions.verticalSpeed ) * 10;
            this.options.position.y = Math.sin( tick * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed ) * 5;
            
            for ( var x = 0; x < this.spawnerOptions.spawnRate * delta; x++ ) {
                this.particleSystem.spawnParticle( options );
            }
        }

        this.particleSystem.update( tick );
        */

        this.render();
        //this.controls.update();
    }


    // render function
    render() {
        this.renderer.render( this.scene, this.camera );
    }
}


// instructions to instantiate the test scene
let test01 = new SceneInit();
test01.initScene();
test01.addCube();
test01.addKTXCube();
test01.addFloor();
test01.addLight();
test01.addWater();
test01.addFog();
//test01.addParticles();
test01.animate();