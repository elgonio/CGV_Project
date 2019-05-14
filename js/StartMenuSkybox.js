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
    // creates the shape
    var geometry = new THREE.CubeGeometry(x, y, z);
    var txt = "assets/img/nightsky_bk.png";
    var left = installTexture("assets/img/cropped.jpg");
    var right = installTexture("assets/img/rotated.jpg");
    var up = installTexture("assets/img/rotated.jpg");
    var down = installTexture("assets/img/cropped.jpg");
    var front = installTexture("assets/img/cropped.jpg");
    //the textures that will be offset
    movingtextures.push(right);
    movingtextures.push(left);
    movingtextures.push(up);
    movingtextures.push(down);
    movingtextures.push(front);
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: right, overdraw: true, side: THREE.DoubleSide }), //right side
        new THREE.MeshBasicMaterial({ map: left, overdraw: true, side: THREE.DoubleSide }), //left side
        new THREE.MeshBasicMaterial({ map: up, overdraw: true, side: THREE.DoubleSide }), //up side
        new THREE.MeshBasicMaterial({ map: down, overdraw: true, side: THREE.DoubleSide }), //down side
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("assets/img/pureblack.jpg"), side: THREE.DoubleSide }), //back side
        new THREE.MeshBasicMaterial({ map: front, overdraw: true, side: THREE.DoubleSide }) //front side
    ];

    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.position.x = 0;
    cube.position.y = 200;
    cube.position.z = 450;
    cube.rotation.x = 0.3;
    scene.add(cube);

}

//game logic
function updateSkybox() {
    if (cube == null) {
        initializeSkybox(600, 600, 2000);
    }
    //movingtex: 0-right 1-left 2-up 3-down 4-front
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