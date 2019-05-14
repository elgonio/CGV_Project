var textureOffsetS; // Horizontal texture offset, for the texture animation.
var textureOffsetT; // Vertical texture offset, for the texture animation.
var material;

material = new THREE.MeshPhongMaterial({
    color: "white",
    specular: 0x080808,
    side: THREE.DoubleSide // so it will  work with open tube and plane
});

var movingtextures = [];
var cube;

function initializeSkybox(x, y, z) {
    cube = null;
    // creates the shape
    var geometry = new THREE.CubeGeometry(x, y, z);
    var left = installTexture("assets/img/cropped.jpg");
    var right = installTexture("assets/img/rotated.jpg");
    var up = installTexture("assets/img/rotated.jpg");
    var down = installTexture("assets/img/cropped.jpg");
    movingtextures.push(right);
    movingtextures.push(left);
    movingtextures.push(up);
    movingtextures.push(down);
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: right, overdraw: true, side: THREE.DoubleSide }), //right side
        new THREE.MeshBasicMaterial({ map: left, overdraw: true, side: THREE.DoubleSide }), //left side
        new THREE.MeshBasicMaterial({ map: up, overdraw: true, side: THREE.DoubleSide }), //up side
        new THREE.MeshBasicMaterial({ map: down, overdraw: true, side: THREE.DoubleSide }), //down side
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("assets/img/pureblack.jpg"), side: THREE.DoubleSide }), //front side
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("assetsimg/pureblack.jpg"), side: THREE.DoubleSide }) //back side
    ];
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.name = "skybox";
    scene.add(cube);
    console.log("added skybox", cube.position);
}

function addSkybox(x, y, z) {
    scene.add(cube);
    console.log("added skybox", cube.position);
}

//game logic
function updateSkybox() {
    if (cube == null) {
        initializeSkybox(75, 75, 500);
    }
    //offsets the specific colours
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