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
        let ambientLight = new THREE.AmbientLight( "rgba(255, 255, 255)", 0.55 );
        ambientLight.castShadow = false;
        this.scene.add( ambientLight );

        // point light example setup
        let pointLight = new THREE.PointLight( "rgba(255, 255, 255)", 1, 100 );
        pointLight.position.set ( 5, 5, 5 );
        this.scene.add( pointLight );
    }

    addCube() {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshPhongMaterial( { color: "rgb(20, 130, 200)" } );
        let cube = new THREE.Mesh( geometry, material );

        cube.rotation.x = 45;
        cube.rotation.y = 45;
    
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


// instructions to instantiate the test scene
let test01 = new SceneInit();
test01.initScene();
test01.addCube();
test01.animate();