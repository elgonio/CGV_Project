// class to initialise the test scene
class SceneInit {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
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
        document.body.appendChild( this.renderer.domElement );


        // ambient light example setup
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.50);
        ambientLight.castShadow = false;
        this.scene.add( ambientLight );
    }

    addCube() {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let cube = new THREE.Mesh( geometry, material );
    
        this.scene.add( cube );
}

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
    }

    render() {
        this.renderer.render( this.scene, this.camera );
    }
}


// instantiate the test scene
let test01 = new SceneInit();
test01.initScene();
test01.addCube();
test01.animate();