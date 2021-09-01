
import { UIPanel, UIDiv } from './libs/ui.js';

function LayerSelection( editor ) {

    var container = new UIPanel();

    var layerSlider = new LayerSlider();

    this.topBall = new LayerSelectionBall( layerSlider );
    this.bottomBall = new LayerSelectionBall( layerSlider );

    this.topBall.handleDrag = (e) => {

        

    }
    this.bottomBall.handleDrag = (e) => {

        

    }


    this.topBallY;
    this.bottomBallY;

    var signals = editor.signals;
    signals.partView.add( () => {

        layerSlider.hide();
        this.topBall.hide();
        this.bottomBall.hide();

    } )
    signals.layerView.add( () => {

        layerSlider.show();
        this.topBall.show();
        this.bottomBall.show();

        this.topBall.setFromTop(0);
        this.bottomBall.setFromBottom(0);        

    } )

    container.add( layerSlider );
    container.add( this.topBall );
    container.add( this.bottomBall );
    return container;

}

class LayerSlider extends UIPanel {

    constructor() {

        super();

        this.dom.id = 'LayerSlider';

    }

}

class LayerSelectionBall extends UIPanel {

    constructor( layerSlider ) {

        super();

        this.layerSlider = layerSlider;
        
        this.dom.className = 'Ball';

        this.dom.draggable = true;

        this.origin = 0;
        this.relY = 0;
        this.y = 0;
        this.dY = 0;
        this.cursorLastY;

        this.minY;
        this.maxY;

        this.handleDrag = () => {};  // Set by external code
        this.handleMove = () => {};  // Set within this class

        this.dom.onpointerdown = (e) => {

            e.preventDefault();
            this.activate();
            this.cursorLastY = e.y;

            window.onpointermove = (e) => {

                this.handleMove(e);

                this.handleDrag(e);

            }

        }
        window.addEventListener( 'pointerup', (e) => {  // Must be a listener, otherwise functions will override each other

            e.preventDefault();
            this.handleMove = () => {};

        } )
        this.dom.onpointermove = () => {};        

    }


    // Allows balls to be moved (activated when they are pressed)
    activate() {

        this.handleMove = (e) => {

            this.dY = e.y - this.cursorLastY;
            this.y += this.dY;

            // Enforce bounds
            if ( this.y < this.minY ) {

                this.y = this.minY;

            } else if ( this.y > this.maxY ) {

                this.y = this.maxY;

            } else {

                this.relY += this.dY;
                this.cursorLastY = e.y;

                this.setPos( this.relY );

            }            

        }

    }

    move() {



    }


    // Always from top, relative to initial position
    setPos( dist ) {

        var adjustedDistance = this.origin + dist;

        this.dom.style.top = String(adjustedDistance) + 'px';
        this.y = this.computeCenter()['y'];

    }

    setFromTop( dist ) {

        this.dom.style.top = 'calc(' + getComputedStyle( this.layerSlider.dom ).getPropertyValue('--top-distance') + ' + ' + String(dist) + 'px' + ' - ' + getComputedStyle( this.dom ).getPropertyValue('--diameter') + '/2)';
        this.y = this.computeCenter()['y'];

        this.origin = this.y;

        // Set bounds
        this.minY = this.origin;
        this.maxY = this.origin + 100;

    }

    // Convert bottom position into top position
    setFromBottom( dist ) {

        this.dom.style.bottom = 'calc(' + getComputedStyle( this.layerSlider.dom ).getPropertyValue('--topbottom-distance') + ' + ' + String(dist) + 'px' + ' - ' + getComputedStyle( this.dom ).getPropertyValue('--diameter') + '/2)';
        var distFromTop = String( this.dom.getBoundingClientRect().top ) + 'px';
        
        this.dom.style.removeProperty( 'bottom' );
        this.dom.style.top = distFromTop;
        
        this.y = this.computeCenter()['y'];

        this.origin = this.y;

        // Set bounds
        this.maxY = this.origin;
        this.minY = this.origin - 100;

    }

    computeCenter() {

        var rect = this.dom.getBoundingClientRect();
        return {
            'x': (rect.left + rect.right)/2,
            'y': (rect.top + rect.bottom)/2
        }

    }

}

class TopBall extends UIDiv {

    constructor() {

        super();

        this.dom.id = 'TopBall';

    }

}

class BottomBall extends UIDiv {

    constructor() {

        super();

        this.dom.id = 'BottomBall';

    }

}

export { LayerSelection }