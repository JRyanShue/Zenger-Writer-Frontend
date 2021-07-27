
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

import { Save } from './API.js';

function MenubarHome ( editor ) {

    var strings = editor.strings;

	var container = new UIPanel();
    container.setClass( 'menubutton' );

    container.onClick( function() {
        // Save the configuration to S3 and return to home page
        Save( editor, editor.toJSON() );
        window.location='/';
    })

    // var title = new UIPanel();
	// title.setClass( 'title' );
	// title.setTextContent( strings.getKey( 'menubar/file' ) );
	// container.add( title );

    return container; 

}

export { MenubarHome }