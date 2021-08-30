
import { UIPanel, UIDiv } from './libs/ui.js';

function Preview( editor ) {

    var container = new UIPanel();

    this.preview = new UIDiv();
    this.preview.dom.className = 'Preview';
    this.preview.dom.style.display = 'none';

    var signals = editor.signals;
    signals.partView.add( () => {

        this.preview.dom.style.display = 'none';

    } )
    signals.layerView.add( () => {

        this.preview.dom.style.display = 'block';

    } )

    container.add( this.preview );

    return container;

}


export { Preview }
