var material;
var video, videoImage, videoImageContext, videoTexture;

function makeTextSprite(message1, message2, parameters) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 18;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : {
            r: 0,
            g: 0,
            b: 0,
            a: 1.0
        };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : {
            r: 255,
            g: 255,
            b: 255,
            a: 1.0
        };
    //var spriteAlignment = THREE.SpriteAlignment.topLeft;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;

    // get size data (height depends only on font size)
    var metrics = context.measureText(message2);

    var textWidth = metrics.width;
    // var textWidth2 = context.measureText(message2);
    // var textWidth = textWidth1;
    // if (textWidth1 <= textWidth2) {
    //     textWidth = textWidth2;
    // }
    // background color
    context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," +
        backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," +
        borderColor.b + "," + borderColor.a + ")";
    context.lineWidth = borderThickness;
    roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness + 40, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";
    context.fillText(message1, borderThickness, fontsize + borderThickness);
    context.fillText(message2, borderThickness, fontsize * 2.5 + borderThickness * 2.5);
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        fog: true
    });
    // var spriteMaterial = new THREE.SpriteMaterial({
    //     map: texture,
    //     useScreenCoordinates: false,
    //     alignment: spriteAlignment
    // });





    // var sprite = new THREE.Sprite( material );
    // 		sprite.position.set( x, y, z );
    // 		sprite.position.normalize();
    // 		sprite.position.multiplyScalar( radius );





    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(100, 50, 1.0);
    return sprite;
}
// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function AddInstructions() {
    textgroup = new THREE.Group();
    //group.position.y = 250;
    // scene.add(textgroup);
    var spritey = makeTextSprite("             Player 1", "Press 'W' to ready up", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(-160, 207, 100);
    textgroup.add(spritey);
    // scene.add(spritey);
    var spritey = makeTextSprite("          Player 2", "Press 'I' to ready up", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(7, 207, 100);
    textgroup.add(spritey);
    //scene.add(spritey);
    var spritey = makeTextSprite("              Player 3", "Press up key to ready up", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });

    spritey.position.set(170, 207, 100);
    textgroup.add(spritey);
}

function HelpInst() {
    HelpRules = new THREE.Group();
    var spritey = makeTextSprite("1: Each player controls", "             a ball                  ", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(10, 240, 100);
    HelpRules.add(spritey);
    // scene.add(spritey);
    var spritey = makeTextSprite("Player1 controls: W,S,A,D ", "(UP, DOWN, LEFT, RIGHT)", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(-160, 207, 100);
    HelpRules.add(spritey);
    var spritey = makeTextSprite("  Player2 controls: I,K,J,L", "(UP, DOWN, LEFT, RIGHT)", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(7, 207, 100);
    HelpRules.add(spritey);
    //scene.add(spritey);
    var spritey = makeTextSprite("       Player3 controls:     ", "            Arrow keys           ", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(170, 207, 100);
    HelpRules.add(spritey);
    var spritey = makeTextSprite("All Players Jump:", "      Space bar       ", {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 100,
            b: 100,
            a: 0.8
        }
    });
    spritey.position.set(22, 173, 100);
    HelpRules.add(spritey);
    var spritey = makeTextSprite("Mix the Balls to create", "      Desired colours     ", {
        fontsize: 24,
        borderColor: {
            r: 250,
            g: 250,
            b: 250,
            a: 1.0
        },
        backgroundColor: {
            r: 240,
            g: 240,
            b: 240,
            a: 0.5
        }
    });
    spritey.position.set(-80, 115, 100);
    HelpRules.add(spritey);
    //HelpRules.add(colours());
    // HelpRules.scale.set(0.5, 0.5, 0.5);

    //var colours = makeimg();
    var colours = makecolourimg();
    colours.position.set(3, 125, 100);
    colours.scale.set(0.75, 0.75, 0.75);
    HelpRules.add(colours);
    HelpRules.add(createhelpvide());
    // HelpRules.scale.set(1, 1, 1);
}

// function colours() {
//     var colourscheme = new THREE.Group();
//     var ball1 = new HomeBall("blue", -200);
//     ball1.get_mesh().position.set(100, 100, 100);
//     colourscheme.add(ball1.get_mesh());
//     var ball1 = new HomeBall("red", -200);
//     ball1.get_mesh().position.set(200, 100, 100);
//     colourscheme.add(ball1.get_mesh());
//     var ball1 = new HomeBall("yellow", -200);
//     ball1.get_mesh().position.set(150, 150, 100);
//     colourscheme.add(ball1.get_mesh());
//     var ball1 = new HomeBall("white", -200);
//     ball1.set_colour("white");
//     ball1.get_mesh().position.set(150, 125, 100);
//     colourscheme.add(ball1.get_mesh());
//     var ball1 = new HomeBall("green", -200);
//     ball1.set_colour("green");
//     ball1.get_mesh().position.set(125, 125, 99);
//     colourscheme.add(ball1.get_mesh());
//     var ball1 = new HomeBall("purple", -200);
//     ball1.set_colour("purple");
//     ball1.get_mesh().position.set(150, 100, 99);
//     colourscheme.add(ball1.get_mesh());
//     var ball1 = new HomeBall("orange", -200);
//     ball1.set_colour("orange");
//     ball1.get_mesh().position.set(175, 125, 99);
//     colourscheme.add(ball1.get_mesh());
//     colourscheme.scale.set(0.5, 0.5, 0.5);
//     colourscheme.position.set(100, 100, 100);
//     return colourscheme;
// }

// function makeimg() {
//     var canvas = document.createElement('canvas');
//     var context = canvas.getContext('2d');
//     make_base();

//     function make_base() {
//         base_image = new Image();
//         base_image.src = 'assets/img/Colour Key Wheel.png';
//         base_image.onload = function() {
//             context.drawImage(base_image, 0, 0);
//         }
//     }
//     var texture = new THREE.Texture(canvas)
//     texture.needsUpdate = true;
//     var spriteMaterial = new THREE.SpriteMaterial({
//         map: texture,
//         color: 0xffffff,
//         fog: false
//     });

//     var sprite = new THREE.Sprite(spriteMaterial);
//     sprite.scale.set(100, 50, -1.0);
//     return sprite;
// }

function makecolourimg() {

    var colourpic = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100, 100),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.5, //set to 0.5 if you want to see it
            //transparent: false,
            map: installTexture("assets/img/ColourWheel2.png"),
            side: THREE.DoubleSide
        })
    );
    // colourpic.position.y = -10;
    // colourpic.position.z = -5;
    return colourpic;
    //plane.rotation.x = -Math.PI / 2;
    //  returnToMain = Tmesh;
    //scene.add(returnToMainB);
}
material = new THREE.MeshPhongMaterial({
    color: "white",
    specular: 0x080808,
    side: THREE.DoubleSide // so it will  work with open tube and plane
});

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

function createhelpvide() {


    // create the video element
    video = document.createElement('video');
    // video.id = 'video';
    // video.type = ' video/ogg; codecs="theora, vorbis" ';
    video.src = "assets/img/DemoSmall_Small.mp4";
    video.load(); // must call after setting/changing source
    video.play();
    videoImage = document.createElement('canvas');
    videoImage.width = 480;
    videoImage.height = 204;
    videoImageContext = videoImage.getContext('2d');
    // background color if no video present
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);
    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    var movieMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: true, side: THREE.DoubleSide });
    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    var movieGeometry = new THREE.PlaneGeometry(240, 100, 4, 4);
    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
    movieScreen.position.set(190, 70, 0);
    return (movieScreen);
}

function updateHelpvid() {
    video.play();
}

function restartvid() {
    video.currentTime = 0;
    //video.play();

}

function renderHelpvid() {
    if (state == 2) {


        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            videoImageContext.drawImage(video, 0, 0);
            if (videoTexture)
                videoTexture.needsUpdate = true;
        }
    }
}