
import * as THREE from 'three'
import { UIPanel } from '../libs/ui'
import { PlateGrid } from '../3D Components/PlateGrid'

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
	this.container.setPosition( 'absolute' );

    this.scene = new THREE.Scene();
    this.scene.name = 'Scene';

    this.mixer = new THREE.AnimationMixer( this.scene );

    this.grid = new PlateGrid( XY, Z );

    this.scene.add( this.grid )

    this.container.dom.appendChild( this.renderer.domElement );

    this.renderer.setPixelRatio( window.devicePixelRatio );
    
    // Value to shif the viewport - must be shifted by default due to window dynamics
    this.viewportOffset = -window.innerHeight / 2 - 150;

    this.render = () => {

        this.renderer.setSize( this.container.dom.offsetWidth, this.container.dom.offsetHeight )
        this.renderer.setViewport( 0, this.viewportOffset, this.container.dom.offsetWidth, this.container.dom.offsetWidth );
        // this.renderer.setViewport( 0, 0, this.container.dom.width, this.container.dom.height );
        this.renderer.render( this.scene, camera );

    }

    this.editorControls = new EditorControls( editor, camera, this.container.dom );

}

export { Scene }
