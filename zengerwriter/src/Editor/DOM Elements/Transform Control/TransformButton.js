
import { UIPanel, UITransformButton, UITransformButtonInner } from '../../libs/ui';

// Toggles the view between part view and layer view

function TransformButton( editor, name, viewSelection, handleClick ) {

    var select = viewSelection.select;

    // Panel: not selectable
    var container = new UIPanel();

    // TransformButton: basic styles
	var transformButton = new UITransformButton();

    // TransformButtonInner: additional styles based on selected/unselected. 
    this.transformButtonInner = new UITransformButtonInner( false );

	this.transformButtonInner.dom.innerHTML = name;
    this.transformButtonInner.dom.onclick = () => {
        
        // Select this button ( highlight it on the screen )
        select( this );
        handleClick(); 

    }

    this.select = () => {

        this.transformButtonInner.dom.className = 'selected';

    }

    this.deselect = () => {

        this.transformButtonInner.dom.className = 'unselected';
        
    }

    transformButton.add( this.transformButtonInner )
	container.add( transformButton );

    viewSelection.transformButtons.push( this );
    return container;

}

export { TransformButton }
