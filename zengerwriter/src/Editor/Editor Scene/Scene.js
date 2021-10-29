
import * as THREE from 'three';
import { UIPanel } from '../libs/ui';
import { PlateGrid } from '../3D Components/PlateGrid';
import { EditorLights } from '../3D Components/EditorLights';

import { EditorControls } from './Controls/EditorControls';
import { ObjectControls } from './Controls/ObjectControls';

import { ViewSelection } from '../DOM Elements/View Control/ViewSelection';
import { TransformSelection } from '../DOM Elements/Transform Control/TransformSelection';

// Build plate dimensions

const XY = 235
const Z = 200

function Scene( editor ) {

    // Define DOM element

    // Container for all DOM elements

    this.container = new UIPanel();
    this.container.setId( 'viewport' );

    var signals = editor.signals;

    // Once DOM element is added, use dimensions to construct THREE.js scene

    signals.sceneContainerAdded.add( () => {

        // Renderer: renders the scene to the screen

        this.renderer = new THREE.WebGLRenderer( {

            antialias: true,
            preserveDrawingBuffer: true

        } );
    
        CreateCamera( this );

        console.log( this.camera )
        
        this.scene = editor.threeScene;
        this.scene.name = 'Scene';
        const clearColor = new THREE.Color();
        this.scene.background = clearColor;

        // Printing plate and volume
        this.scene.add( new PlateGrid( XY, Z ) );

        // Lights for the objects
        EditorLights( editor );

        // Attach THREE.js scene to the DOM element
        this.container.dom.appendChild( this.renderer.domElement );

        this.renderer.setPixelRatio( window.devicePixelRatio );
        
        this.render = () => {

            this.viewportOffset = 0;

            // Bugs out when the window width falls below 600 (for no reason -- height is greater than 600), seems to be a native feature of some dependency

            this.renderer.setSize( this.container.dom.offsetWidth, this.container.dom.offsetHeight );
            this.renderer.setViewport( 0, this.viewportOffset, this.container.dom.offsetWidth, this.container.dom.offsetHeight );
            this.renderer.render( this.scene, this.camera );

        }

        this.editorControls = new EditorControls( editor, this.camera, this.container.dom );

        signals.render.add( () => {

            this.render();

        } )

        /**
         * @param {THREE.Vector3} newPos Vector3 that holds the object's new position
         */
        function setObjectPos( object, newPos ) {

            object.position.set( newPos.x, newPos.y, newPos.z );
            signals.render.dispatch();

        }

        signals.moveObjectTo.add( ( object, newPos ) => {

            setObjectPos( object, newPos );

        } )

        this.objectControls = new ObjectControls( editor, this.camera, this.container.dom );

        // On window resize, reset the camera's aspect ratio and render
        
        signals.windowResize.add( () => {

            this.camera.aspect = this.container.dom.offsetWidth / this.container.dom.offsetHeight;
            this.camera.updateProjectionMatrix();

            signals.render.dispatch();

        } )

        // Add ViewSelection

        this.container.add( new ViewSelection( editor ) );

        // Add TransformSelection

        this.container.add( new TransformSelection( editor ) );

    } )

}

function CreateCamera( scene ) {

    // Define camera

    var maxDist = 5000;  // Far plane for the PerspectiveCamera
    var aspectRatio = scene.container.dom.offsetWidth / scene.container.dom.offsetHeight;
    console.log( scene.container.dom.offsetWidth, scene.container.dom.offsetHeight )
    scene.camera = new THREE.PerspectiveCamera( 50, aspectRatio, 0.01, maxDist );
    scene.camera.name = 'Camera';
    var distanceAway = 250;
    scene.camera.position.set( distanceAway/1.5, distanceAway, distanceAway );

    // Use 3D printers' x/y/z orientation
    
    scene.camera.up.set( 0, 0, 1 );  
    scene.camera.lookAt( new THREE.Vector3() );

}

export { Scene }
