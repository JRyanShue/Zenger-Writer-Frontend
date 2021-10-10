
import * as THREE from 'three'

// Default definitions

// THREE.js camera for the scene
var _DEFAULT_CAMERA = new THREE.PerspectiveCamera( 50, 1, 0.01, 1000 );
_DEFAULT_CAMERA.name = 'Camera';
_DEFAULT_CAMERA.position.set( 0, 5, 10 );

// Use 3D printers' x/y/z orientation
_DEFAULT_CAMERA.up.set( 0, 0, 1 );  
_DEFAULT_CAMERA.lookAt( new THREE.Vector3() );

function EditorCamera( editor ) {

    return _DEFAULT_CAMERA.clone();

}

export { EditorCamera }
