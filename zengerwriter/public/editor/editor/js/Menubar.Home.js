
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

import { Save } from './API.js';

function MenubarHome ( editor ) {

    var strings = editor.strings;

	var container = new UIPanel();
    container.setClass( 'menubutton' );

    container.onClick( function() {

        // Save to the cloud
        editor.signals.save.dispatch();
        Save( editor, editor.username, editor.editorID ) // calls screenshot saving via signal
        .then( (response) => {

            console.log(response);

            //
            
            //

            //Return to home page
            console.log("going home");

            setTimeout(() => {
                window.location='/';
            }, 15000);
            

        });

        

    })

    // var title = new UIPanel();
	// title.setClass( 'title' );
	// title.setTextContent( strings.getKey( 'menubar/file' ) );
	// container.add( title );

    return container; 

}

export { MenubarHome }