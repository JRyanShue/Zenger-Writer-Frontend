
import * as THREE from 'three';
import { UIPanel } from '../libs/ui';
import { PlateGrid } from '../3D Components/PlateGrid';
import { EditorLights } from '../3D Components/EditorLights';

import { EditorControls } from './Mouse Manipulation/EditorControls';

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
	// this.container.setPosition( 'absolute' );

    // this.scene = new THREE.Scene();
    this.scene = editor.threeScene;
    this.scene.name = 'Scene';
    const clearColor = new THREE.Color();
    this.scene.background = clearColor;

    this.mixer = new THREE.AnimationMixer( this.scene );

    // Printing plate and volume
    this.grid = new PlateGrid( XY, Z );
    this.scene.add( this.grid )

    // Lights for the objects
    this.lights = new EditorLights( editor );

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

    signals.render.add(() => {

        this.render();

    })

}

export { Scene }
