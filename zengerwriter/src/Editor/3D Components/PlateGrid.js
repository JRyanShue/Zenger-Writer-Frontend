
import * as THREE from 'three'

function PlateGrid( XY, Z ) {

    var grid = new THREE.Group();

    // Build plate grid
	var grid1 = new THREE.GridHelper( XY, XY/10, 0x888888 );
	grid1.rotateX(Math.PI / 2);  // Follow coordinate convention
	grid1.material.color.setHex( 0x888888 );
	grid1.material.vertexColors = false;
	grid.add( grid1 );

	var grid2 = new THREE.GridHelper( XY, XY/10, 0x222222 );
	grid2.rotateX(Math.PI / 2);  // Follow coordinate convention
	grid2.material.color.setHex( 0x222222 );
	grid2.material.depthFunc = THREE.AlwaysDepth;
	grid2.material.vertexColors = false;
	grid.add( grid2 );

    // Build volume box
	const mesh = new THREE.Mesh(
		new THREE.BoxGeometry( XY, XY, Z ),
		new THREE.MeshBasicMaterial()
	);

	mesh.translateZ( Z/2 );

	var volBox = new THREE.BoxHelper( mesh, 0x121e6b );

    grid.add( volBox );

    return grid

}

export { PlateGrid }
