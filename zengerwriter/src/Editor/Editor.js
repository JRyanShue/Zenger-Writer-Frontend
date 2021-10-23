
import { useEffect } from 'react'
import * as THREE from 'three'
import signals from 'signals'

import { Banner } from './Top Banner/Banner'
import { Scene as SceneManager } from './Editor Scene/Scene'
import { SceneHelpers } from './Editor Scene/SceneHelpers'
import { EditorCamera } from './Editor Scene/EditorCamera'
import { DragDrop } from './Drag and Drop/DragDrop'

import { Strings } from './Utils/Strings'
import { SliceSettings } from './Utils/SliceSettings'

import { Loader } from './Utils/Loader'
import { Slice } from './API'

import { UIPanel } from './libs/ui'

import './css/main.css'

/*
    "Main class" for the editor
    Handles everything. Appends all child elements to the DOM.
    Many functions split into other classes. 
*/

// Set default orientation
THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

function Editor() {

    // Signals constructor

    var Signal = signals.Signal;

    // Default signals for easy communication between classes. They allow classes to use "this" without bugging out. 

    this.signals = {

        render: new Signal(),
        objectAdded: new Signal(),  // This signal adds the THREE.js object to arrays (for tracking) in various objects. 

        objectClicked: new Signal(),
        objectDragged: new Signal(),

        moveObjectTo: new Signal(),

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

    this.dragDrop = new DragDrop( this );

    // Loader: converts file drops into the THREE.js object format, and adds the object to the scene

    this.loader = new Loader( this );

    this.camera = new EditorCamera();    

    // THREE.js Scene: held by editor so that children can access

    this.threeScene = new THREE.Scene();

    // Track all objects added to the scene

    this.objects = [];
    this.signals.objectAdded.add( ( object ) => {

        this.objects.push( object );

    } )

    this.selectedObject = null;

    // Function Definitions

    this.addObject = ( object, parent, index ) => {

        this.threeScene.add( object );
        this.signals.objectAdded.dispatch( object );
        this.signals.render.dispatch();

    }

    this.select = ( object ) => {

        this.selectedObject = object;

    }

    // Scene object: manages editor scene

    this.scene = new SceneManager( this );
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

    // Add parent element to DOM

    this.ui = new UIEditor( this );
    document.body.appendChild( this.ui.dom );

    // Add generic listeners

    window.addEventListener( 'resize', this.signals.render.dispatch );

}

Editor.prototype = {

    

}

/* 
    Using the three.js authors' UI library, 
    mimick React behavior without needing to adhere to the React project structure (React is bad for this application)
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

        // var queries = ["?editorURL=", "&username=", "&editorID=", "&editorName="];

        // var urlVars = window.location.search.toString();
        // var editorURL = urlVars.slice( urlVars.indexOf(queries[0]) + queries[0].length, urlVars.indexOf(queries[1]) );
        // var username = urlVars.slice( urlVars.indexOf(queries[1]) + queries[1].length, urlVars.indexOf(queries[2]) );
        // var editorID = urlVars.slice( urlVars.indexOf(queries[2]) + queries[2].length, urlVars.indexOf(queries[3]) );
        // var editorName = urlVars.slice( urlVars.indexOf(queries[3]) + queries[3].length, urlVars.length );
        // editorName = decodeURIComponent(editorName);  // Decode percent encoding
        // console.log("URL:", editorURL, "Username:", username, "editorID:", editorID, "editorName:", editorName);

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

    // Return blank div -- this class renders directly through the document rather than using React's structure. 

    return (

        <div/>

    )

}

export default EditorComponent

