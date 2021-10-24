
/* 
    Handles Event listeners for drag and drop, handle the datatransfer and add objects to scene 
*/

import { Loader } from '../Utils/Loader';

function DragDrop( editor ) {

    // Need to use a scope variable in order to reference this object during event handling
    var scope = this;

    scope.loader = new Loader( editor );

    document.addEventListener( 'dragover', function ( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

    }, false );

    document.addEventListener( 'drop', function ( event ) {

        event.preventDefault();
        // console.log("file dropped.");

        if ( event.dataTransfer.types[ 0 ] === 'text/plain' ) return; // Outliner drop

        // if ( editor.viewMode == 'Part' ) {

        if ( event.dataTransfer.items ) {

            // DataTransferItemList supports folders
            // This block is called when dropping in an STL. 
            
            scope.loader.loadItemList( event.dataTransfer.items );
            console.log(event.dataTransfer.items)

        } else {

            // editor.loader.loadFiles( event.dataTransfer.files );
            console.log(event.dataTransfer.files)

        }

        // }
        
    }, false );

}

export { DragDrop }
