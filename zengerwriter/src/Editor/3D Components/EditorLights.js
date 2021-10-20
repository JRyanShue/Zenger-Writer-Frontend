
import * as THREE from 'three';

function EditorLights( editor ) {

    // Ambient Light

    var color = 0x222222;

    var light = new THREE.AmbientLight( color );
    light.name = 'AmbientLight';

    editor.addObject( light );



}

export { EditorLights }
