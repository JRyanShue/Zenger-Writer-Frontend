
import * as THREE from 'three';

function SnapDown( editor ) {

    var signals = editor.signals;

    const absoluteBounds = new THREE.Box3();

    console.log("snapping down");
    var object = editor.selectedObject;  // works like a THREE.Mesh() 
    // console.log( object )
    var geometry = object.geometry; 
    // console.log( geometry )
    geometry.computeBoundingBox();

    absoluteBounds.copy( geometry.boundingBox ).applyMatrix4( object.matrixWorld );  // Absolute bounding box

    var newPosition = new THREE.Vector3(object.position.x, object.position.y, object.position.z - absoluteBounds.min.z)
    
    signals.moveObjectTo.dispatch( object, newPosition );
    

}

export { SnapDown };