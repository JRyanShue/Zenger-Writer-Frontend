
import * as THREE from 'three';
import { Vector3 } from 'three';

import { SnapDown } from '../../Utils/ObjectUtils';

function ObjectControls( editor, camera, domElement ) {

    var container = domElement;
    var objects = editor.objects;

    this.delta = new THREE.Vector3();
    this.initialPlaneIntersect = new THREE.Vector3();
    this.initialObjectPos = new THREE.Vector3();

    // Provides plane for moving objects along it

    function TransformControlsPlane() {

        var plane = new THREE.PlaneGeometry( 100000, 100000, 2, 2 );
        var transparentMaterial = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.0 } );
        var object = new THREE.Mesh( plane, transparentMaterial );

        object.name = 'TransformControlsPlane'

        return object;

    }

    this.transformControlsPlane = new TransformControlsPlane();
    editor.addObject( this.transformControlsPlane );

    //

    function onMouseDown( e ) {  // LEFT OFF HERE

        // Get mouse position as a value from 0 to 1 for x and y within the DOM element
        mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );

        // From this mouse position, find intersections with objects
        var intersects = getObjectIntersects( mouseDownPosition, objects );
        console.log( intersects )
        
        if ( intersects.length > 0 ) {

            var chosenObject = intersects[0];
            editor.select( chosenObject.object );

            editor.signals.render.dispatch();

            editor.signals.objectClicked.dispatch( mouseDownPosition );

            // Enable dragging
            document.addEventListener( 'pointermove', onPointerMove, false );

            // Disable drag on mouseup
            document.addEventListener( 'mouseup', () => {
                document.removeEventListener( 'pointermove', onPointerMove, false );
                SnapDown( editor );
            }, false );

        } else {

            editor.select( null );

        }

    }

    function onPointerMove( e ) {

        if ( editor.selectedObject ) {

            // Move object along plane
            mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );
            var planeIntersect = getPlaneIntersect( mouseDownPosition, objects );
            
            editor.signals.objectDragged.dispatch( planeIntersect );

        }

    }

    editor.signals.objectClicked.add( ( mouseDownPosition ) => {

        // Set initial plane intersection position, to find delta later
        this.initialPlaneIntersect.copy( getPlaneIntersect( mouseDownPosition, objects ).point );

        // Set initial object position, to set new position later
        this.initialObjectPos.copy( editor.selectedObject.position );

    } )

    editor.signals.objectDragged.add( ( planeIntersect ) => {

        // Calculate delta
        this.delta.copy( planeIntersect.point ).sub( this.initialPlaneIntersect );

        // Set new object position
        editor.signals.moveObjectTo.dispatch( editor.selectedObject, new Vector3( this.initialObjectPos.x + this.delta.x, this.initialObjectPos.y + this.delta.y, this.initialObjectPos.z + this.delta.z ) );
        
    } )

    //

    document.addEventListener( 'mousedown', onMouseDown );

    // Utils

    var mouseDownPosition = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

    function getMousePosition( dom, x, y ) {

        // Get mouse position within a DOM element
		var rect = dom.getBoundingClientRect();
		return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

	}

    function getIntersects( point, objects ) {

        // Get intersections with THREE.js objects based on mouse position

        // Convert point to range of -1 to 1 for raycaster
		mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
        // Adjust plane of selection based on camera viewing angle
		raycaster.setFromCamera( mouse, camera );

        // Find and return intersection
		return raycaster.intersectObjects( objects );

	}

    function getObjectIntersects( point, objects ) {

        var intersections = getIntersects( point, objects );
        return intersections.filter( obj => {
            return obj.object.name != 'TransformControlsPlane';
        } );

    }

    function getPlaneIntersect( point, objects ) {

        var intersections = getIntersects( point, objects );
        return intersections.filter( obj => {
            return obj.object.name === 'TransformControlsPlane';
        } )[0];

    }

}

export { ObjectControls }
