
import { useEffect } from 'react';
import * as THREE from 'three'
import signals from 'signals'

import { Banner } from './Top Banner/Banner'
import { Scene } from './Editor Scene/Scene'
import { SceneHelpers } from './Editor Scene/SceneHelpers';
import { EditorCamera } from './Editor Scene/EditorCamera';
import { DragDrop } from './Drag and Drop/DragDrop'

import { Strings } from './Utils/Strings'
import { SliceSettings } from './Utils/SliceSettings';

import { Loader } from './Utils/Loader';
import { Slice } from './API';

import { UIPanel } from './libs/ui';



import './css/main.css';

/*
    "Main" function for the editor
*/

// Set default orientation
THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

function Editor() {

    // Signals constructor

    var Signal = signals.Signal;

    // Scene rendering variables

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

    this.dragDrop = new DragDrop();

    // Loader: converts file drops into the THREE.js object format, and adds the object to the scene

    this.loader = new Loader( this );

    this.camera = new EditorCamera();

    // Scene object: manages editor scene

    this.scene = new Scene( this );
    this.sceneHelpers = new SceneHelpers();

    // Currently selected object

    this.selected = null;

    // Slice settings

    this.sliceSettings = new SliceSettings();

    // 

    this.delMoveFulfilled = false;  // Whether the API has responded after deleting and moving the editor's info
	this.saveFulfilled = false;

    // Current viewmode (part and layer views available)

    this.viewMode = 'Part';
	this.parts = [];

    // Variables for gcode preview on layer view

	this.gcode = null;
	this.gcodelines = [];
	this.layers = [];
	this.layerOpacity = 0.2;

    this.ui = new UIEditor( this );
    document.body.appendChild( this.ui.dom );

}

/* 
Using the three.js authors' UI library, mimick React behavior without needing to adhere to the React project structure
The UIEditor element serves as the 'root'
*/
function UIEditor( editor ) {

    var container = new UIPanel;

    container.add( editor.scene.container );

    return container;

}

function EditorComponent() {

    var editor;

    useEffect(() => {

        var queries = ["?editorURL=", "&username=", "&editorID=", "&editorName="];

        var urlVars = window.location.search.toString();
        var editorURL = urlVars.slice( urlVars.indexOf(queries[0]) + queries[0].length, urlVars.indexOf(queries[1]) );
        var username = urlVars.slice( urlVars.indexOf(queries[1]) + queries[1].length, urlVars.indexOf(queries[2]) );
        var editorID = urlVars.slice( urlVars.indexOf(queries[2]) + queries[2].length, urlVars.indexOf(queries[3]) );
        var editorName = urlVars.slice( urlVars.indexOf(queries[3]) + queries[3].length, urlVars.length );
        editorName = decodeURIComponent(editorName);  // Decode percent encoding
        console.log("URL:", editorURL, "Username:", username, "editorID:", editorID, "editorName:", editorName);

        // Subsequent code is built in vanilla JS

        editor = new Editor();

        editor.scene.render();

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
        // requestAnimationFrame( animate );  // Keeps animation loop continuing
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

