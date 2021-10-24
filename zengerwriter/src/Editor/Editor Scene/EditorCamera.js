
import * as THREE from 'three'

// Default definitions
function EditorCamera( editor ) {

    // THREE.js camera for the scene
    var maxDist = 5000;  // Far plane for the PerspectiveCamera
    var _DEFAULT_CAMERA = new THREE.PerspectiveCamera( 50, 1.6, 0.01, maxDist );
    _DEFAULT_CAMERA.name = 'Camera';
    var distanceAway = 650;
    _DEFAULT_CAMERA.position.set( distanceAway, distanceAway, distanceAway );

    // Use 3D printers' x/y/z orientation
    _DEFAULT_CAMERA.up.set( 0, 0, 1 );  
    _DEFAULT_CAMERA.lookAt( new THREE.Vector3() );

    return _DEFAULT_CAMERA.clone();

}

export { EditorCamera }
