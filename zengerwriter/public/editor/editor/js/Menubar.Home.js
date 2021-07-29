
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

import { Save } from './API.js';

function MenubarHome ( editor ) {

    var strings = editor.strings;

	var container = new UIPanel();
    container.setClass( 'menubutton' );

    container.onClick( function() {

        // Save synchronously, both locally and in the cloud
        editor.storage.set( editor.toJSON() );
        // Cloud
        Save( editor );

        console.log("done saving");

        //Return to home page
        console.log("going home");
        window.location='/';

    })

    // var title = new UIPanel();
	// title.setClass( 'title' );
	// title.setTextContent( strings.getKey( 'menubar/file' ) );
	// container.add( title );

    return container; 

}

export { MenubarHome }