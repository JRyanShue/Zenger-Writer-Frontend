
import { UIPanel } from '../../libs/ui';
import { TransformButton } from './TransformButton';

// Returns TransformButtons for selecting which view to use in the viewport

function TransformSelection( editor ) {

    var container = new UIPanel();
    container.dom.className = 'TransformSelection';

    // Array of all TransformButtons ( for selection control )
    this.transformButtons = [];

    this.select = ( selected ) => {

        for ( var index in this.transformButtons ) {

            var button = this.transformButtons[ index ];
            if ( button == selected ){

                button.select();
                
            }
            else {

                button.deselect();

            }

        }
    }

    var signals = editor.signals;

    // translate is always at index 0
    var translate = new TransformButton( editor, './Images/TranslateImage.png', this, () => { signals.setTransformMode.dispatch(  'translate') } );
    var rotate = new TransformButton( editor, './Images/RotateImage.png', this, () => { signals.setTransformMode.dispatch( 'rotate' ) } );

    container.add( translate );
    container.add( rotate );

    // Select transformButtons index 0 (translate)
    this.transformButtons[0].transformButtonInner.dom.onmousedown();

    return container;

}

export { TransformSelection }
