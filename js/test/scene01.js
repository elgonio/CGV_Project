// class to initialise the test scene
class SceneInit {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        //this.controls = controls;
    }


    initScene() {
        // create the scene
        this.scene = new THREE.Scene();

        // create the camera
        this.camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight), 0.1, 1000 );
        this.camera.position.z = 5;

        // setup the renderer with the html canvas in index
        this.renderer = new THREE.WebGLRenderer(
            {canvas: document.getElementById( 'renderer' ), antialias: true} // setup antialias here
        );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        // add support for shadow mapping in renderer
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // append renderer as dominant element
        document.body.appendChild( this.renderer.domElement );
    }


    addCube() {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshPhongMaterial( { color: "rgb(20, 130, 200)", dithering: true } );
        let cube = new THREE.Mesh( geometry, material );

        // cube shadow properties
            cube.castShadow = true;
            cube.receiveShadow = false;

        // demo cube positioning
        cube.position.set( 0, 0, 2 );
        cube.rotation.x = 45;
        cube.rotation.y = 45;
    
        this.scene.add( cube );
    }
    

    addFloor() {
        let material = new THREE.MeshPhongMaterial( { color: "rgb(220, 220, 220)", dithering: true } );
        let geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        let floor = new THREE.Mesh( geometry, material );

        floor.position.set( 0, -1, 0 );
        
        // floor shadow properties
            floor.receiveShadow = true;
        
        this.scene.add( floor );
    }

    
    addWater() {
        var params = {
			color: '#ffffff',
			scale: 4,
			flowX: 1,
			flowY: 1
        };
        
        let waterGeo = new THREE.PlaneBufferGeometry( 200, 200 );
		let water = new THREE.Water( waterGeo, {
			color: params.color,
			scale: params.scale,
			flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
			textureWidth: 1024,
			textureHeight: 1024
        } );
            
		water.position.y = ( -1 );
		water.rotation.x = ( Math.PI * (- 0.5) );
		this.scene.add( water );
    }


    // particle system demo
    addParticles() {
        let clock = new THREE.Clock();
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


    addLight() {
        // ambient light example setup
        let ambientLight = new THREE.AmbientLight( "rgb(255, 255, 255)", 0.55);
            ambientLight.castShadow = false;
        this.scene.add( ambientLight );

        // point light example setup
        let pointLight = new THREE.PointLight( "rgb(255, 255, 0)", 1, 100 );
            pointLight.position.set ( 5, 5, 5 );
        // point light shadow properties
            pointLight.shadow.mapSize.width = 512;
            pointLight.shadow.mapSize.height = 512;
            pointLight.shadow.camera.near = 0.5;
            pointLight.shadow.camera.far = 500;
        this.scene.add( pointLight );

        // spot light example setup
        let spotLight = new THREE.SpotLight( "rgb(255, 0, 0)", 1 );
            spotLight.position.set( 15, 40, 35 );
            spotLight.angle = ( Math.PI/4 );
            spotLight.penumbra = 0.05;
            spotLight.decay = 2;
            spotLight.distance = 200;
        // spot light shadow properties
            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;
            spotLight.shadow.camera.near = 10;
            spotLight.shadow.camera.far = 200;
        this.scene.add( spotLight );
    }


    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
        //this.controls.update();
    }


    render() {
        this.renderer.render( this.scene, this.camera );
    }
}


// instructions to instantiate the test scene
let test01 = new SceneInit();
test01.initScene();
test01.addCube();
test01.addFloor();
test01.addLight();
test01.addWater();
test01.addParticles();
test01.animate();