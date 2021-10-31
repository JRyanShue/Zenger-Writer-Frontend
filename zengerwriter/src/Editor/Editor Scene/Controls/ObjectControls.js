
import * as THREE from 'three';
import { Vector3 } from 'three';

function ObjectControls( editor, camera, domElement ) {

    var container = domElement;
    var objects = editor.objects;
    var signals = editor.signals;

    this.delta = new THREE.Vector3();
    this.initialPlaneIntersect = new THREE.Vector3();
    this.initialObjectPos = new THREE.Vector3();

    // Provides plane for moving objects along it

    function TransformControlsPlane() {

        var plane = new THREE.PlaneGeometry( 100000, 100000, 2, 2 );
        var transparentMaterial = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.0, side: THREE.DoubleSide } );
        var object = new THREE.Mesh( plane, transparentMaterial );

        object.name = 'TransformControlsPlane'

        return object;

    }

    this.transformControlsPlane = new TransformControlsPlane();
    editor.addObject( this.transformControlsPlane );

    //

    function onMouseDown( e ) {  // LEFT OFF HERE

        if ( editor.transformMode === 'translate' ) {

            translateObject( e );

        } 
        else if ( editor.transformMode === 'rotate' ) {

            rotateObject( e );
            // console.log( 'rotate' );

        }

    }

    function translateObject( e ) {

        if ( e.button == 0 ) {

            // Get mouse position as a value from 0 to 1 for x and y within the DOM element
            mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );

            // From this mouse position, find intersections with objects
            var intersects = getObjectIntersects( mouseDownPosition, objects );
            
            if ( intersects.length > 0 ) {

                var chosenObject = intersects[0];
                editor.select( chosenObject.object );

                signals.render.dispatch();
                signals.objectClicked.dispatch( mouseDownPosition );

                // Enable dragging
                document.addEventListener( 'pointermove', onObjectDrag, false );

                // Disable drag on mouseup
                document.addEventListener( 'mouseup', () => {

                    document.removeEventListener( 'pointermove', onObjectDrag, false );
                    editor.snapDown();
                    
                }, false );

            } else {

                editor.select( null );

            }

        }

    }

    function rotateObject( e ) {

        if ( e.button == 0 ) {

            mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );
            var intersects = getObjectIntersects( mouseDownPosition, objects );
            if ( intersects.length > 0 ) {
            
                console.log(intersects[0].object.rotation.y)
                intersects[0].object.rotation.y += 0.01;
                // var bbox = new THREE.Box3().setFromObject(intersects[0].object);
                // editor.addElement(bbox)
                intersects[0].object.updateMatrixWorld( true );

            }

            editor.updateBoundingBox();

            signals.render.dispatch();

        }

    }

    function onObjectHover( e ) {

        if ( editor.transformMode === 'translate' ) {
        
            translateHover( e );

        } else if ( editor.transformMode === 'rotate' ) {

            rotateHover( e );
            // console.log( 'rotate' );

        }
    
    }

    function translateHover( e ) {

        // Highlight objects when the mouse hovers over them, default color otherwise

        mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );
        var intersects = getObjectIntersects( mouseDownPosition, objects );
        if ( intersects.length > 0 ) {

            intersects[0].object.material.color = {b: 1, r: 0, g: 0}

        }
        else {

            for ( var object in objects ) {

                if ( objects[object].material && objects[object].name != 'TransformControlsPlane' ) {

                    objects[object].material.color = {b:1, r:1, g:1};

                }

            }

        }

        signals.render.dispatch();

    }

    function rotateHover( e ) {

        // Highlight objects when the mouse hovers over them, default color otherwise

        mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );
        var intersects = getObjectIntersects( mouseDownPosition, objects );
        if ( intersects.length > 0 ) {

            // intersects[0].object.material.color = {b: 1, r: 0, g: 0}
            // console.log(intersects[0].face);
            // console.log(intersects[0].face.normal);
            

        }
        // else {

        //     for ( var object in objects ) {

        //         if ( objects[object].material && objects[object].name != 'TransformControlsPlane' ) {

        //             objects[object].material.color = {b:1, r:1, g:1};

        //         }

        //     }

        // }

        

        signals.render.dispatch();

    }

    function onObjectDrag( e ) {

        if ( editor.selectedObject ) {

            // Move object along plane
            mouseDownPosition.fromArray( getMousePosition( domElement, e.clientX, e.clientY ) );
            var planeIntersect = getPlaneIntersect( mouseDownPosition, objects );
            
            signals.objectDragged.dispatch( planeIntersect );

        }

    }

    signals.objectClicked.add( ( mouseDownPosition ) => {

        // Set initial plane intersection position, to find delta later
        this.initialPlaneIntersect.copy( getPlaneIntersect( mouseDownPosition, objects ).point );  // BUG OCCASIONALLY HAPPENS HERE, after obeject is rotated.

        // Set initial object position, to set new position later
        this.initialObjectPos.copy( editor.selectedObject.position );

    } )

    signals.objectDragged.add( ( planeIntersect ) => {

        // Calculate delta
        this.delta.copy( planeIntersect.point ).sub( this.initialPlaneIntersect );

        // Set new object position
        signals.moveObjectTo.dispatch( editor.selectedObject, new Vector3( this.initialObjectPos.x + this.delta.x, this.initialObjectPos.y + this.delta.y, this.initialObjectPos.z + this.delta.z ) );
        
        // Update bounding box
        editor.updateBoundingBox();

    } )

    //

    document.addEventListener( 'mousedown', onMouseDown );
    document.addEventListener( 'mousemove', onObjectHover );

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
