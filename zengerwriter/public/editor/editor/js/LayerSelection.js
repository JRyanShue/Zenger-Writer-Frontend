
import { UIPanel, UIDiv } from './libs/ui.js';
import { LayerSlider, LayerSelectionArea, LayerSelectionBall } from './LayerSelection.Helper.js'

function LayerSelection( editor ) {

    var container = new UIPanel();

    this.layerSlider = new LayerSlider();

    this.layerSelectionArea = new LayerSelectionArea();

    this.topBall = new LayerSelectionBall( this );
    this.bottomBall = new LayerSelectionBall( this );

    // These methods cannot be set within their class because they depend on dynamic factors
    var minDistBetweenBalls = 50;
    this.topBall.handleSelect = () => {
        this.topBall.maxY = this.bottomBall.y - minDistBetweenBalls;
    }
    this.bottomBall.handleSelect = () => {
        this.bottomBall.minY = this.topBall.y + minDistBetweenBalls;
    }

    this.topBallY;
    this.bottomBallY;

    var signals = editor.signals;
    signals.partView.add( () => {

        this.layerSlider.hide();
        this.layerSelectionArea.hide();
        this.topBall.hide();
        this.bottomBall.hide();

    } )
    // Certain objects need to be instantiated or displayed before LayerSelection becomes functional 
    signals.layerView.add( () => {

        this.layerSlider.show();
        this.layerSelectionArea.show();
        this.topBall.show();
        this.bottomBall.show();

        this.topBall.setFromTop(0);
        this.bottomBall.setFromBottom(0);        

        this.layerSelectionArea.update( { 'top': this.topBall.y, 'bottom': this.bottomBall.y } );

        this.topBall.handleDrag = (e) => {
            // Update layer selection area
            this.layerSelectionArea.update( { 'top': this.topBall.y } )
        }
        this.bottomBall.handleDrag = (e) => {
            // Update layer selection area
            this.layerSelectionArea.update( { 'bottom': this.bottomBall.y } )
        }

    } )

    container.add( this.layerSlider );
    container.add( this.layerSelectionArea );
    container.add( this.topBall );
    container.add( this.bottomBall );
    return container;

}



export { LayerSelection }