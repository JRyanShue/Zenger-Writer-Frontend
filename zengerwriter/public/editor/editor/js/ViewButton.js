
// Toggles the view between part view and layer view

import { UIPanel, UIViewButton, UIViewButtonInner } from './libs/ui.js';

function ViewButton( editor ) {

    // Panel: not selectable
    var container = new UIPanel();

    // ViewButton: basic styles
	var viewButton = new UIViewButton();

    // ViewButtonInner: additional styles based on selected/unselected. 
    var viewButtonInner = new UIViewButtonInner( false );


	viewButtonInner.dom.innerHTML = "Layer View";


    viewButton.add( viewButtonInner )
	container.add( viewButton );

    return container;

}

export { ViewButton }