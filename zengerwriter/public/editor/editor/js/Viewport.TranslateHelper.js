
import {
	BoxGeometry,
	BufferGeometry,
	CylinderGeometry,
	DoubleSide,
	Euler,
	Float32BufferAttribute,
	Line,
	LineBasicMaterial,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	OctahedronGeometry,
	PlaneGeometry,
	Quaternion,
	Raycaster,
	SphereGeometry,
	TorusGeometry,
	Vector3
} from '../../build/three.module.js';

const _raycaster = new Raycaster();

class TranslateHelper {

    constructor( camera ) {

        this.object;
        this.camera = camera;
        this._plane = new TransformControlsPlane();
        this.pointStart = new Vector3();
        this.pointEnd = new Vector3();
        this.worldPositionStart = new Vector3();

    }

    attachObject( object ) {

        this.object = object;
        
    }

    // Takes object (Object3D) and change in mouse coordinates (as Vector2), translates object's position
    translateRelative( object, change, event ) {

        console.log( this.object )

        var changeNDS = this.convertToNDS( change );
        var pointer = this.getPointer( event );

        // Find click point based on camera angle
		_raycaster.setFromCamera( pointer, this.camera );

        // Find intersection with build plate plane
		const planeIntersect = this.intersectObjectWithRay( this._plane, _raycaster, true );

        if ( ! planeIntersect ) return;

        this.pointEnd.copy( planeIntersect.point ).sub( this.object.position );

        // Calculate translation offset
        var offset = new Vector3();
        offset.copy( pointEnd ).sub( this.pointStart );

        // If axis excludes dimension
        if ( axis.indexOf( 'X' ) === - 1 ) this._offset.x = 0;
        if ( axis.indexOf( 'Y' ) === - 1 ) this._offset.y = 0;
        if ( axis.indexOf( 'Z' ) === - 1 ) this._offset.z = 0;

        //
        this._offset.applyQuaternion( this._parentQuaternionInv ).divide( this._parentScale );

        // Set object position
        object.position.copy( this._offset ).add( this._positionStart );


    }

    translateObject( pointer ) {

        // Always translate on the XY plane. 
		const object = this.object;

		// Need to set this.dragging to true when the drag starts within the object/raycaster intersection
		if ( object === undefined || this.dragging === false || pointer.button !== - 1 ) return;

		// Find click point based on camera angle
		_raycaster.setFromCamera( pointer, this.camera );

		// Find intersection with build plate plane
		const planeIntersect = this.intersectObjectWithRay( this._plane, _raycaster, true );

		console.log( planeIntersect )

		if ( ! planeIntersect ) return;

		// 'pointEnd' is a Vector3. Find relative change by copying planeIntersect location and subtracting the location of the drag start
		this.pointEnd.copy( planeIntersect.point ).sub( this.worldPositionStart );

		console.log( mode )
		if ( mode === 'translate' ) {

			// Apply translate

			// Calculate translation offset
			this._offset.copy( this.pointEnd ).sub( this.pointStart );

			// If axis excludes dimension
			if ( axis.indexOf( 'X' ) === - 1 ) this._offset.x = 0;
			if ( axis.indexOf( 'Y' ) === - 1 ) this._offset.y = 0;
			if ( axis.indexOf( 'Z' ) === - 1 ) this._offset.z = 0;

			//
			this._offset.applyQuaternion( this._parentQuaternionInv ).divide( this._parentScale );

			// Set object position
			object.position.copy( this._offset ).add( this._positionStart );

        }

        this.dispatchEvent( _changeEvent );
		this.dispatchEvent( _objectChangeEvent );

    }

    intersectObjectWithRay( object, raycaster, includeInvisible ) {

        const allIntersections = raycaster.intersectObject( object, true );
    
        for ( let i = 0; i < allIntersections.length; i ++ ) {
    
            if ( allIntersections[ i ].object.visible || includeInvisible ) {
    
                return allIntersections[ i ];
    
            }
    
        }
    
        return false;
    
    }

    // Convert coordinates to NDS from -1 to 1 (Normalized Device Coordinates)
    convertToNDS( x, y ) {

        const rect = this.domElement.getBoundingClientRect();

        return {
            x: ( x - rect.left ) / rect.width * 2 - 1,
            y: - ( y - rect.top ) / rect.height * 2 + 1
        };
    
    }

    getPointer( event ) {

        // Return x and y, both from -1 to 1, and the event button
    
        if ( this.domElement.ownerDocument.pointerLockElement ) {
    
            return {
                x: 0,
                y: 0,
                button: event.button
            };
    
        } else {
    
            const rect = this.domElement.getBoundingClientRect();
    
            return {
                x: ( event.clientX - rect.left ) / rect.width * 2 - 1,
                y: - ( event.clientY - rect.top ) / rect.height * 2 + 1,
                button: event.button
            };
    
        }
    
    }

}


class TransformControlsPlane extends Mesh {

	constructor() {

		super(
			new PlaneGeometry( 100000, 100000, 2, 2 ),
			new MeshBasicMaterial( { visible: false, wireframe: true, side: DoubleSide, transparent: true, opacity: 0.1, toneMapped: false } )
		);

		this.type = 'TransformControlsPlane';

	}

	updateMatrixWorld( force ) {

		let space = this.space;

		this.position.copy( this.worldPosition );

		if ( this.mode === 'scale' ) space = 'local'; // scale always oriented to local rotation

		_v1.copy( _unitX ).applyQuaternion( space === 'local' ? this.worldQuaternion : _identityQuaternion );
		_v2.copy( _unitY ).applyQuaternion( space === 'local' ? this.worldQuaternion : _identityQuaternion );
		_v3.copy( _unitZ ).applyQuaternion( space === 'local' ? this.worldQuaternion : _identityQuaternion );

		// Align the plane for current transform mode, axis and space.

		_alignVector.copy( _v2 );

		switch ( this.mode ) {

			case 'translate':
			case 'scale':
				switch ( this.axis ) {

					case 'X':
						_alignVector.copy( this.eye ).cross( _v1 );
						_dirVector.copy( _v1 ).cross( _alignVector );
						break;
					case 'Y':
						_alignVector.copy( this.eye ).cross( _v2 );
						_dirVector.copy( _v2 ).cross( _alignVector );
						break;
					case 'Z':
						_alignVector.copy( this.eye ).cross( _v3 );
						_dirVector.copy( _v3 ).cross( _alignVector );
						break;
					case 'XY':
						_dirVector.copy( _v3 );
						break;
					case 'YZ':
						_dirVector.copy( _v1 );
						break;
					case 'XZ':
						_alignVector.copy( _v3 );
						_dirVector.copy( _v2 );
						break;
					case 'XYZ':
					case 'E':
						_dirVector.set( 0, 0, 0 );
						break;

				}

				break;
			case 'rotate':
			default:
				// special case for rotate
				_dirVector.set( 0, 0, 0 );

		}

		if ( _dirVector.length() === 0 ) {

			// If in rotate mode, make the plane parallel to camera
			this.quaternion.copy( this.cameraQuaternion );

		} else {

			_tempMatrix.lookAt( _tempVector.set( 0, 0, 0 ), _dirVector, _alignVector );

			this.quaternion.setFromRotationMatrix( _tempMatrix );

		}

		super.updateMatrixWorld( force );

	}

}


export { TranslateHelper }