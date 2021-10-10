
import { useEffect } from 'react';
import * as THREE from 'three'
import signals from 'signals'

import { Banner } from './Top Banner/Banner'
import { Scene } from './Editor Scene/Scene'
import { DragDrop } from './Drag and Drop/DragDrop'
import { Strings } from './Utils/Strings'

import { Loader } from './Utils/Loader';

/*
    "Main" function for the editor
*/

// Default definitions

// THREE.js camera for the scene
var _DEFAULT_CAMERA = new THREE.PerspectiveCamera( 50, 1, 0.01, 1000 );
_DEFAULT_CAMERA.name = 'Camera';
_DEFAULT_CAMERA.position.set( 0, 5, 10 );

// Use 3D printers' x/y/z orientation
_DEFAULT_CAMERA.up.set( 0, 0, 1 );  
_DEFAULT_CAMERA.lookAt( new THREE.Vector3() );

// Set default orientation
THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

function Editor() {

    // Signals constructor

    var Signal = signals.Signal;

    // Scene rendering variables

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    // Default signals for easy communication between classes

    this.signals = {

        homeButtonClicked: new Signal(),

		partView: new Signal(),
		layerView: new Signal(),

		gcodeLoaded: new Signal()

    };

    //
    
    this.config = {

        'language': 'en'

    }

    // Strings: text labels for DOM components

    this.strings = new Strings( this.config );

    // Add functionality

    var dragDrop = new DragDrop();

    //




    var queries = ["?editorURL=", "&username=", "&editorID=", "&editorName="];

    var urlVars = window.location.search.toString();
    var editorURL = urlVars.slice( urlVars.indexOf(queries[0]) + queries[0].length, urlVars.indexOf(queries[1]) );
    var username = urlVars.slice( urlVars.indexOf(queries[1]) + queries[1].length, urlVars.indexOf(queries[2]) );
    var editorID = urlVars.slice( urlVars.indexOf(queries[2]) + queries[2].length, urlVars.indexOf(queries[3]) );
    var editorName = urlVars.slice( urlVars.indexOf(queries[3]) + queries[3].length, urlVars.length );
    editorName = decodeURIComponent(editorName);  // Decode percent encoding
    console.log("URL:", editorURL, "Username:", username, "editorID:", editorID, "editorName:", editorName);

    var scene = new Scene()
    document.body.appendChild( scene.dom )


    // === THREE.JS CODE START ===
        
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // camera.position.z = 5;
    // var animate = function () {
    // requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // renderer.render( scene, camera );
    // };
    // animate();
        // === THREE.JS EXAMPLE CODE END ===

}

function EditorComponent() {

    var editor;

    useEffect(() => {

        // Subsequent code is built in vanilla JS

        editor = new Editor();

        // var banner = new Banner();
        // document.body.appendChild( banner.dom )

        // === THREE.JS CODE START ===
        
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // var cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        // camera.position.z = 5;
        // var animate = function () {
        // requestAnimationFrame( animate );
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // renderer.render( scene, camera );
        // };
        // animate();
        // === THREE.JS EXAMPLE CODE END ===

    })

    return (

        <div/>

    )

}

export default EditorComponent

