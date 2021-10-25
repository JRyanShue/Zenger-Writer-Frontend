
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

import { SnapDown } from './Utils/ObjectUtils';

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

        sceneContainerAdded: new Signal(),

        windowResize: new Signal(),

        homeButtonClicked: new Signal(),

		partView: new Signal(),
		layerView: new Signal(),

        setTransformMode: new Signal(),

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

    this.camera = null;    

    // THREE.js Scene: held by editor so that children can access

    this.threeScene = new THREE.Scene();

    // Track all objects added to the scene

    this.objects = [];
    this.signals.objectAdded.add( ( object ) => {

        this.objects.push( object );
        this.select( object );
        this.snapDown();

    } )

    this.selectedObject = null;

    // Function Definitions

    this.addElement = ( element ) => {  // For non-mesh objects (that have different attributes)

        this.threeScene.add( element );
        this.signals.render.dispatch();

    }

    this.addObject = ( object, parent, index ) => {

        this.threeScene.add( object );
        this.signals.objectAdded.dispatch( object );
        this.signals.render.dispatch();

    }

    this.select = ( object ) => {

        this.selectedObject = object;

    }

    // Drop selected object to build plate 

    this.snapDown = () => {

        if ( this.selectedObject ) {

            SnapDown( this );

        }

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

    this.signals.sceneContainerAdded.dispatch();

    // Add generic listeners

    window.addEventListener( 'resize', this.signals.windowResize.dispatch );

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

        // Subsequent code is built in vanilla JS

        editor = new Editor();

        editor.scene.render();

    })

    // Return blank div -- this class renders directly through the document rather than using React's structure. 

    return (

        <div/>

    )

}

export default EditorComponent

