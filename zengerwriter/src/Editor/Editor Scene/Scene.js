
import * as THREE from 'three';
import { UIPanel } from '../libs/ui';
import { PlateGrid } from '../3D Components/PlateGrid';
import { EditorLights } from '../3D Components/EditorLights';

import { EditorControls } from './Controls/EditorControls';
import { ObjectControls } from './Controls/ObjectControls';

import { SnapDown } from '../Utils/ObjectUtils';
import { Vector3, VideoTexture } from 'three';

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
    
        // Define camera

        var maxDist = 5000;  // Far plane for the PerspectiveCamera
        var aspectRatio = this.container.dom.offsetWidth / this.container.dom.offsetHeight;
        console.log( this.container.dom.offsetWidth, this.container.dom.offsetHeight )
        this.camera = new THREE.PerspectiveCamera( 50, aspectRatio, 0.01, maxDist );
        this.camera.name = 'Camera';
        var distanceAway = 250;
        this.camera.position.set( distanceAway, distanceAway, distanceAway );

        // Use 3D printers' x/y/z orientation
        
        this.camera.up.set( 0, 0, 1 );  
        this.camera.lookAt( new THREE.Vector3() );

        console.log( this.camera )
        
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

            // console.log( this.scene )
            // this.scene.scale = new Vector3( 1, 1, 0.5 )
            // Value to shift the viewport vertically by - already shifted by default below due to window dynamics
            this.viewportOffset = -(this.container.dom.offsetHeight)/5;  // Empirically imperfect approximation, but good enough
            this.viewportOffset = 0;

            // Bugs out when the window width falls below 600 (for no reason -- height is greater than 600), seems to be a native feature of some dependency

            this.renderer.setSize( this.container.dom.offsetWidth, this.container.dom.offsetHeight );
            this.renderer.setViewport( 0, -(this.container.dom.offsetWidth - this.container.dom.offsetHeight)/2 + this.viewportOffset, this.container.dom.offsetWidth, this.container.dom.offsetWidth );
            this.renderer.setViewport( 0, 0, this.container.dom.offsetWidth, this.container.dom.offsetHeight );
            this.renderer.render( this.scene, this.camera );

            console.log(this.renderer)

        }

        this.editorControls = new EditorControls( editor, this.camera, this.container.dom );

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

        this.objectControls = new ObjectControls( editor, this.camera, this.container.dom );

        // On window resize, reset the camera's aspect ratio and render
        
        signals.windowResize.add( () => {

            signals.render.dispatch();

        } )

    } )

}

export { Scene }
