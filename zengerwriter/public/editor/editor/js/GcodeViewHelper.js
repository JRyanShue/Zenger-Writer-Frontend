
import { GetGcode } from './API.js'
import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { RemoveObjectCommand } from './commands/RemoveObjectCommand.js';

function GcodeViewHelper( editor, container, render, viewport ) {

    console.log( container )

    var signals = editor.signals;

    signals.partView.add( () => {

		editor.viewMode = 'Part';
		container.dom.style.display = 'block';

		removeLayerView( editor ); 
		addObjects( editor ); 

	} )
	signals.layerView.add( async function() {

		// Switch to layer view
		if ( editor.viewMode = 'Part' ) {

			editor.viewMode = 'Layer';

			await addLayerView( editor, viewport );
			removeObjects( editor );
			
			render();

		}

	} )

	
	async function addLayerView( editor, viewport ) {

		// Slice into editor.gcode
		await GetGcode( editor, editor.IP );

		// Parse
		editor.gcodelines = editor.gcode.split( '\n' );
		console.log( "Parsing gcode..." );
		var layer = []; 
		// var lastLoc = editor.gcodelines[0];

		// Initialize z
		var zVal = editor.settings.dict["quality"]["initial_layer_height"] || 0.2;
		

		for ( var index in editor.gcodelines ) {  // .slice( 1 )

			var currentLine = editor.gcodelines[ index ];

			// Extrusion commands. Assume lines are equal width
			if ( currentLine.includes(" E") ) {

				var xVal = getXVal( currentLine );
				var yVal = getYVal( currentLine );
				
				layer.push( new THREE.Vector3( xVal - viewport.sidelen/2, yVal - viewport.sidelen/2, zVal ) );		
				
			}
			// if layer is done (signaled by a change in z), flush the layer into the scene. 
			else if ( currentLine.includes(" Z") && !currentLine.includes(";") ) {

				zVal += editor.settings.dict["quality"]["layer_height"];

				// Add z lift
				var xVal = getXVal( currentLine );
				var yVal = getYVal( currentLine );
				
				layer.push( new THREE.Vector3( xVal - viewport.sidelen/2, yVal - viewport.sidelen/2, zVal ) );	

				// Must have new material each time to edit layers individually
				var material = new THREE.LineBasicMaterial( { color: 0x0000ff, transparent: true, opacity: editor.layerOpacity } );
				var geometry = new THREE.BufferGeometry( { boundingSphere: null } ).setFromPoints( layer );
				var line = new THREE.Line( geometry, material );

				console.log( line )
				editor.layers.push( line );
				editor.scene.add( line );
				
				layer = [];
				
			}

		}

		// Remove first layer ( it is the line on the side )
		editor.layers.splice( 0, 1 )

		render();
		signals.gcodeLoaded.dispatch();
		console.log( editor.layers );

	}


	function getXVal( line ) {

		var xIndex = line.indexOf( "X" )
		var firstSpaceIndex = xIndex + line.slice( xIndex ).indexOf( " " )
		return line.slice( xIndex + 1, firstSpaceIndex );

	}
	function getYVal( line ) {

		var yIndex = line.indexOf( "Y" )
		var firstSpaceIndex = yIndex + line.slice( yIndex ).indexOf( " " )
		return line.slice( yIndex + 1, firstSpaceIndex );

	}


	function removeLayerView( editor ) {

		var removeObjects = [];
		editor.scene.traverse( ( object ) => {

			if ( object.type == "Line" ) {

				removeObjects.push( object );

			}
			
		} )
		for ( var index in removeObjects ) {

			editor.removeObject(removeObjects[ index ] );

		}
		editor.layers = [];
		render();

	}


	function addObjects( editor ) {

		// Add back all objects in part view
		for ( var index in editor.parts ) {

			editor.execute( new AddObjectCommand( editor, editor.parts[ index ] ) );

		}
		editor.deselect();

	}


	// Remove objects and save them to add back later. 
	function removeObjects( editor ) {

		var removeObjects = [];
		editor.scene.traverse( ( object ) => {

			if ( object.type == "Mesh" ) {

				editor.parts.push( object );

				removeObjects.push( object );

			}
			
		} )
		for ( var index in removeObjects ) {

			removeObjects[ index ].geometry.dispose();
			removeObjects[ index ].material.dispose();

			editor.execute( new RemoveObjectCommand( editor, removeObjects[ index ] ) );

		}

	}

}


export { GcodeViewHelper }