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