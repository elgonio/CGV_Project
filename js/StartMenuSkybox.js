// FPS
/*

(function() {
    var script = document.createElement('script');
    script.onload = function() {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
})();
*/


//var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//var renderer = new THREE.WebGLRenderer();
// The currently used texture.
var textureOffsetS; // Horizontal texture offset, for the texture animation.
var textureOffsetT; // Vertical texture offset, for the texture animation.
var material;
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

// update viewport on resize
/*
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height; //aspect ratio
    camera.updateProjectionMatrix();
});
*/

//controls
//var controls = new THREE.OrbitControls(camera, renderer.domElement);

material = new THREE.MeshPhongMaterial({
    color: "white",
    specular: 0x080808,
    side: THREE.DoubleSide // so it will  work with open tube and plane
});

var movingtextures = [];
var cube;

function initializeSkybox(x, y, z) {
    // creates the shape
    var geometry = new THREE.CubeGeometry(x, y, z);
    var txt = "assets/img/nightsky_bk.png";
    var left = installTexture("assets/img/cropped.jpg");
    var right = installTexture("assets/img/rotated.jpg");
    var up = installTexture("assets/img/rotated.jpg");
    var down = installTexture("assets/img/cropped.jpg");
    var front = installTexture("assets/img/cropped.jpg");

    // var left = installTexture(txt);
    // var right = installTexture(txt);
    // var up = installTexture(txt);
    // var down = installTexture(txt);
    // var front = installTexture(txt);


    movingtextures.push(right);
    movingtextures.push(left);
    movingtextures.push(up);
    movingtextures.push(down);
    movingtextures.push(front);
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: right, overdraw: true, side: THREE.DoubleSide }), //front side
        new THREE.MeshBasicMaterial({ map: left, overdraw: true, side: THREE.DoubleSide }), //back side
        new THREE.MeshBasicMaterial({ map: up, overdraw: true, side: THREE.DoubleSide }), //up side
        new THREE.MeshBasicMaterial({ map: down, overdraw: true, side: THREE.DoubleSide }), //down side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../assets/img/pureblack.jpg"), side: THREE.DoubleSide }), //right side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("../assetsimg/pureblack.jpg"), side: THREE.DoubleSide }) //left side
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("assets/img/pureblack.jpg"), side: THREE.DoubleSide }), //right side
        new THREE.MeshBasicMaterial({ map: front, overdraw: true, side: THREE.DoubleSide }) //left side
    ];

    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.position.x = 0;
    cube.position.y = 200;
    cube.position.z = 450;
    cube.rotation.x = 0.3;
    scene.add(cube);
    console.log("added skybox", cube.position);
}



// Camera Position
//camera.position.z = 3;

// lighting




//game logic
function updateSkybox() {
    if (cube == null) {
        initializeSkybox(600, 600, 2000);
    }
    textureOffsetS += 0.00137;
    textureOffsetT -= 0.00137;
    movingtextures[0].offset.set(textureOffsetS, 0);
    movingtextures[0].needsUpdate;
    movingtextures[1].offset.set(textureOffsetS * -1, 0);
    movingtextures[1].needsUpdate;
    movingtextures[2].offset.set(0, textureOffsetT * -1);
    movingtextures[2].needsUpdate;
    movingtextures[3].offset.set(0, textureOffsetT);
    movingtextures[3].needsUpdate;
    movingtextures[4].offset.set(0, textureOffsetT * -1);
    movingtextures[4].needsUpdate;
}




//render logic
var render = function() {


    renderer.render(scene, camera);
};

function installTexture(texfile) {
    var callback = function() {
        // to be called after the texture is loaded, to show the new texture
        material.needsUpdate = true;
        try {
            render();
        } catch (e) {
            document.getElementById("headline").innerHTML =
                "Can't access texture.  Note that some browsers<br>can't use a texture from a local disk.";
        }
    };
    var loader = new THREE.TextureLoader();

    var texture = loader.load(texfile, callback);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Important to set repeat mode!!
    material.map = texture; // Applies this texture to the material and hence to the object.
    material.needsUpdate = true; // Essential to tell three.js that material properties have changed!!
    textureOffsetS = 0; // we start the texture with no texture offset
    textureOffsetT = 0;
    return texture;

}
//run game loop (update, render, repeat)
var GameLoop = function() {
    requestAnimationFrame(GameLoop);
    update();
    render();
};

//GameLoop();