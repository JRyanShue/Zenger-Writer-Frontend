
import { ViewButton } from './ViewButton.js';
import { UIPanel } from './libs/ui.js';

// Returns ViewButtons for selecting which view to use in the viewport

function ViewSelection( editor ) {

    var container = new UIPanel();
    container.dom.className = 'ViewSelection';

    // Array of all ViewButtons ( for selection control )
    this.viewButtons = [];

    this.select = ( selected ) => {

        for ( var index in this.viewButtons ) {

            var viewButton = this.viewButtons[ index ];
            if ( viewButton == selected ){

                viewButton.select();
                
            }
            else {

                viewButton.deselect();

            }
        }
    }

    var partView = new ViewButton( editor, 'Part View', this );
    var layerView = new ViewButton( editor, 'Layer View', this );

    container.add( partView );
    container.add( layerView );

    return container;

}

export { ViewSelection }
