
import * as THREE from 'three';
import { UIPanel } from '../libs/ui';
import { PlateGrid } from '../3D Components/PlateGrid';
import { EditorLights } from '../3D Components/EditorLights';

import { EditorControls } from './Controls/EditorControls';
import { ObjectControls } from './Controls/ObjectControls';

import { SnapDown } from '../Utils/ObjectUtils';

// Build plate dimensions

const XY = 235
const Z = 200

function Scene( editor ) {

    var signals = editor.signals;
    var camera = editor.camera;
    var sceneHelpers = editor.sceneHelpers;
    var showSceneHelpers = true;  // ?

    // Renderer: renders the scene to the screen

    this.renderer = new THREE.WebGLRenderer( {

        antialias: true,
        preserveDrawingBuffer: true

    } );

    // Container for all DOM elements

    this.container = new UIPanel();
    this.container.setId( 'viewport' );
	
    this.scene = editor.threeScene;
    this.scene.name = 'Scene';
    const clearColor = new THREE.Color();
    this.scene.background = clearColor;

    this.mixer = new THREE.AnimationMixer( this.scene );  // ?

    // Printing plate and volume
    this.scene.add( new PlateGrid( XY, Z ) );

    // Lights for the objects
    EditorLights( editor );

    // Attach THREE.js scene to the DOM element
    this.container.dom.appendChild( this.renderer.domElement );

    this.renderer.setPixelRatio( window.devicePixelRatio );
    
    this.render = () => {

        // Value to shift the viewport vertically by - already shifted by default below due to window dynamics
        this.viewportOffset = -(this.container.dom.offsetHeight)/5;  // Empirically imperfect approximation, but good enough

        // Bugs out when the window width falls below 600 (for no reason -- height is greater than 600), seems to be a native feature of some dependency

        this.renderer.setSize( this.container.dom.offsetWidth, this.container.dom.offsetHeight );
        this.renderer.setViewport( 0, -(this.container.dom.offsetWidth - this.container.dom.offsetHeight)/2 + this.viewportOffset, this.container.dom.offsetWidth, this.container.dom.offsetWidth );
        this.renderer.render( this.scene, camera );

    }

    this.editorControls = new EditorControls( editor, camera, this.container.dom );

    signals.render.add( () => {

        this.render();

    } )

    /**
     * @param {Vector3} newPos Vector3 that holds the object's new position
     */
    function setObjectPos( object, newPos ) {

        object.position.set( newPos.x, newPos.y, newPos.z );
        signals.render.dispatch();

    }

    signals.moveObjectTo.add( ( object, newPos ) => {

        setObjectPos( object, newPos );

    } )

    this.objectControls = new ObjectControls( editor, camera, this.container.dom );

}

export { Scene }
