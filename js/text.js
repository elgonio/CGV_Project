//text variables that are used often
var text = "Colour Mix",
    height = 15,
    size = 50,
    hover = 10,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5,
    bevelEnabled = true,
    font = undefined,
    fontName = "optimer",
    fontWeight = "bold";

//material for the heading text
materials = [
    new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
    }), // front
    new THREE.MeshPhongMaterial({
        color: 0xffffff
    }) // side
];

//loads the heading font
function loadFont(txtHead, txtSub) {
    var loader = new THREE.FontLoader();
    loader.load('assets/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function(response) {
        font = response;
        refreshText(txtHead, txtSub);
    });
}

//the txt is the display words
//pos is the x posistion
//ts, is the varible that relates to this object
function NewText(txt, pos, Ts) {
    var loader = new THREE.FontLoader();
    loader.load('assets/fonts/helvetiker_bold.typeface.json', function(font) {
        var textGeo = new THREE.TextGeometry(txt, {
            font: font,
            size: size / 2,
            height: 5,
            curveSegments: curveSegments,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled
        });
        material = [
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                flatShading: true
            }), // front
            new THREE.MeshPhongMaterial({
                color: 0xffffff
            }) // side
        ];
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();

        textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);
        var Tmesh = new THREE.Mesh(textGeo, material);
        Tmesh.position.x = pos;
        Tmesh.position.y = 120;
        Tmesh.position.z = 89;
        Tmesh.rotation.x = 0;
        Tmesh.rotation.y = Math.PI * 2;

        //if the tmesh relates to the main menu
        if (Ts == 0) {
            Tmesh.position.y = 30;
            //add a box around "go back to main" so more area to click
            returnToMainB = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(430, 45, 22, 22),
                new THREE.MeshBasicMaterial({
                    //color: 0xffffff,
                    opacity: 0, //set to 0.5 if you want to see it
                    transparent: true
                })
            );
            returnToMainB.position.y = -10;
            returnToMainB.position.z = -5;
            //plane.rotation.x = -Math.PI / 2;
            returnToMain = Tmesh;

            scene.add(returnToMainB);
        } else if (Ts == 1) {
            scene.remove(t1);
            t1 = Tmesh;
        } else if (Ts == 2) {
            scene.remove(t2);
            t2 = Tmesh;
        } else {
            scene.remove(t3);
            t3 = Tmesh;

        }
        console.log("tmes" + t1);
        scene.add(Tmesh);


    });
    // return Tmesh;
}

function createText(Heading, subHeading) {
    textGeo = new THREE.TextGeometry(Heading, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled
    });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);
    textMesh1 = new THREE.Mesh(textGeo, materials);
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;
    group.add(textMesh1);
    //creates mirror effect

    textGeo = new THREE.TextGeometry(subHeading, {
        font: font,
        size: size / 2,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled
    });
    textMesh2 = new THREE.Mesh(textGeo, materials);
    textMesh2.position.x = centerOffset;
    textMesh2.position.y = hover - 30;
    textMesh2.position.z = height;
    //textMesh2.rotation.x = Math.PI;
    textMesh2.rotation.y = Math.PI * 2;
    group.add(textMesh2);

    // group.add(Newword.get_mesh());
}

//refreshes the headingtext
function refreshText(txtHead, txtSub) {
    group.remove(textMesh1);
    group.remove(textMesh2);
    createText(txtHead, txtSub);
}