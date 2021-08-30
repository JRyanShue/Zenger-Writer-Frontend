
import * as THREE from '../../build/three.module.js';
import { UIPanel, UIDiv } from './libs/ui.js';

// Wrapper for g-code preview

function Preview( editor ) {

    var container = new UIPanel();

    this.preview = new UIDiv();
    this.preview.dom.id = 'Preview';
    this.preview.dom.style.display = 'none';

    // For toggling layer view on/off

    var signals = editor.signals;
    signals.partView.add( () => {

        this.preview.dom.style.display = 'none';

    } )
    signals.layerView.add( () => {

        this.preview.dom.style.display = 'block';

    } )

    // Renderer 

    var renderer = new THREE.WebGLRenderer(); 
    this.preview.dom.appendChild( renderer.domElement );

    container.add( this.preview );

    return container;

}


export { Preview }
