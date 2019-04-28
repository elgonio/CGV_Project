
class Tracks{

	constructor(){

		var trackGeometry, trackMaterial;
		this.trackObjects = new THREE.Group(); //Object to group the individial tracks together

		this.obsTrackMeshArray = []
		this.playerTrackMeshArray = [];

		var trackGeometry = new THREE.BoxGeometry( 0.2, 0.2, 500);
		var trackMaterial = new THREE.MeshLambertMaterial( { color: 0x444444, 
                                                        emissive: 0xffffff,
                                                        emissiveIntensity: 1,
                                                        side: THREE.DoubleSide
                                                        } );
		
		//Create track lines indicate the paths of incoming block obstacles
		var xPos = -10;
		for (var i = 0; i <= 4; i++) {
			this.obsTrackMeshArray[i] = new THREE.Mesh(trackGeometry, trackMaterial);
			this.obsTrackMeshArray[i].position.set(xPos, -1.5, -50);
			this.trackObjects.add(this.obsTrackMeshArray[i]);
			xPos += 5;
		}

		//Change from vertical to horizontal track geometry
		trackGeometry = new THREE.BoxGeometry( 25, 0.2, 0.2);

		//Create track lines indicate the paths of that the player can move on horizontally
		var zPos = -7.5;
		for (var i = 0; i <= 1; i++) {
			this.playerTrackMeshArray[i] = new THREE.Mesh(trackGeometry, trackMaterial);
			this.playerTrackMeshArray[i].position.set(0, -1.5, zPos);
			this.trackObjects.add(this.playerTrackMeshArray[i]);
			zPos += 7.5;
		}

	}

	get_TrackMeshes(){
		return this.trackObjects;
	}
}