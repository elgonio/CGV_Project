function loadFont(txtHead, txtSub) {
    var loader = new THREE.FontLoader();
    loader.load('assets/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function(response) {
        font = response;
        refreshText(txtHead, txtSub);
    });
}

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
        var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
        textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);
        var Tmesh = new THREE.Mesh(textGeo, material);
        Tmesh.position.x = pos;
        Tmesh.position.y = 120;
        Tmesh.position.z = 89;
        Tmesh.rotation.x = 0;
        Tmesh.rotation.y = Math.PI * 2;
        // Tmesh.position.set(0, 0, 0);
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
            returnToMainB.position.y = 5;
            returnToMainB.position.z = -5;
            //plane.rotation.x = -Math.PI / 2;
            returnToMain = Tmesh;
            scene.add(returnToMainB);
        } else if (Ts == 1) {
            t1 = Tmesh;
        } else if (Ts == 2) {
            t2 = Tmesh;
        } else {
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

function refreshText(txtHead, txtSub) {
    group.remove(textMesh1);
    group.remove(textMesh2);
    createText(txtHead, txtSub);
}