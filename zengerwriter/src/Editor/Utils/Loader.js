
/*
The code below was adapted from the THREE.js editor:

The MIT License

Copyright © 2010-2021 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import * as THREE from 'three';

import { TGALoader } from './Loaders/TGALoader.js';

import { AddObjectCommand } from '../Commands/AddObjectCommand.js';

import { LoaderUtils } from './LoaderUtils.js';

/*
	Class taken from THREE.js editor
	Parses and adds objects to scene from files
*/

function Loader( editor ) {

	var scope = this;

	this.texturePath = '';

	this.loadItemList = function ( items ) {

		LoaderUtils.getFilesFromItemList( items, function ( files, filesMap ) {

			scope.loadFiles( files, filesMap );

		} );

	};

	this.loadFiles = function ( files, filesMap ) {

		if ( files.length > 0 ) {

			var filesMap = filesMap || LoaderUtils.createFilesMap( files ); // gets the first truthy value to make map of files

			var manager = new THREE.LoadingManager();
			manager.setURLModifier( function ( url ) {

				url = url.replace( /^(\.?\/)/, '' ); // remove './' // ^: global search, n?: zero or one of n, .: single character

				var file = filesMap[ url ];

				if ( file ) {

					console.log( 'Loading', url );

					return URL.createObjectURL( file );

				}

				return url;

			} );

			manager.addHandler( /\.tga$/i, new TGALoader() );

			for ( var i = 0; i < files.length; i ++ ) {

				scope.loadFile( files[ i ], manager );

			}

		}

	};

	this.loadFile = function ( file, manager ) {

		var filename = file.name;
		var extension = filename.split( '.' ).pop().toLowerCase();

		var reader = new FileReader();
		reader.addEventListener( 'progress', function ( event ) {

			// var size = '(' + Math.floor( event.total / 1000 ).format() + ' KB)';
			var size = '(' + Math.floor( event.total / 1000 ) + ' KB)';
			var progress = Math.floor( ( event.loaded / event.total ) * 100 ) + '%';

			console.log( 'Loading', filename, size, progress );

		} );

		switch ( extension ) {

			/* Use different loaders for different file types */

			case '3mf':

				reader.addEventListener( 'load', async function ( event ) {

					var { ThreeMFLoader } = await import( './Loaders/3MFLoader.js' );

					var loader = new ThreeMFLoader();
					var object = loader.parse( event.target.result );

					// editor.execute( new AddObjectCommand( editor, object ) );
					editor.addObject( object );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'obj':

				reader.addEventListener( 'load', async function ( event ) {

					var contents = event.target.result;

					var { OBJLoader } = await import( './Loaders/OBJLoader.js' );

					var object = new OBJLoader().parse( contents );
					object.name = filename;

					// editor.execute( new AddObjectCommand( editor, object ) );
					editor.addObject( object );

				}, false );
				reader.readAsText( file );

				break;

			case 'stl':

				reader.addEventListener( 'load', async function ( event ) {

					var contents = event.target.result;
					console.log("Finished Loading.");

					var { STLLoader } = await import( './Loaders/STLLoader.js' );

					var geometry = new STLLoader().parse( contents );
					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;
					console.log("Created Mesh.");

					// editor.execute( new AddObjectCommand( editor, mesh ) );
					editor.addObject( mesh );

				}, false );

				// Below blocks are not called if above block is successful. 
				if ( reader.readAsBinaryString !== undefined ) {

					console.log("reading as binary string");
					reader.readAsBinaryString( file );

				} else {

					console.log("reading as array buffer");
					reader.readAsArrayBuffer( file );

				}

				break;

		}

	};

}

export { Loader };