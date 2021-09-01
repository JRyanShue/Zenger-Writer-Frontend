
import { UIPanel, UIDiv } from './libs/ui.js';
import { LayerSlider, LayerSelectionArea, LayerSelectionBall } from './LayerSelection.Helper.js'

function LayerSelection( editor ) {

    var container = new UIPanel();

    this.layerSlider = new LayerSlider();

    this.layerSelectionArea = new LayerSelectionArea();

    this.topBall = new LayerSelectionBall( this );
    this.bottomBall = new LayerSelectionBall( this );

    // These methods cannot be set within their class because they depend on dynamic factors
    this.minDistBetweenBalls = 50;
    this.topBall.handleSelect = () => {
        this.topBall.maxY = this.bottomBall.y - this.minDistBetweenBalls;
    }
    this.bottomBall.handleSelect = () => {
        this.bottomBall.minY = this.topBall.y + this.minDistBetweenBalls;
    }

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

        this.minY = this.topBall.y;
        this.maxY = this.bottomBall.y;

        this.sliderLength = this.maxY - this.minY;
        this.functionalSliderLength = this.sliderLength - this.minDistBetweenBalls;
        this.yPerLayer = this.functionalSliderLength / this.numLayers;

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
    signals.gcodeLoaded.add( () => {

        this.numLayers = editor.layers.length;
        this.yPerLayer = this.functionalSliderLength / this.numLayers;

        console.log( editor.materials )

        // Adjust layer visibility based on layer selection
        this.updateLayers = () => {

            console.log( this.selection['start'], this.selection['end'] );

            // Make transparent layers above the top slider ball
            var tLayer = this.numLayers - 1;
            while ( tLayer > this.selection['end'] + 1 ) {

                editor.layers[ tLayer ].material.opacity = 0;
                tLayer --;

            }

            // Make transparent layers below the bottom slider ball
            var bLayer = 0;
            while ( bLayer < this.selection['start'] - 1 ) {

                editor.layers[ bLayer ].material.opacity = 0;
                bLayer ++;

            }

            // Make all other layers transluscent
            var layer = bLayer;
            while ( layer < tLayer ) {

                editor.layers[ layer ].material.opacity = editor.layerOpacity;
                layer ++;

            }

            signals.rendererUpdated.dispatch();

        }

    } )


    // Bounds of the range slider
    this.minY;
    this.maxY;

    this.sliderLength;
    this.functionalSliderLength;  // Amount of length that dictates layer selection (subtract buffer between balls)

    this.selection = {
        
        'start': 0,
        'end': 100

    }

    this.numLayers = 100.0;
    this.yPerLayer;

    this.updateSelection = () => {

        // distance from origin on balls
        var top = this.layerSelectionArea.top - this.minY;
        var bottom = this.maxY - this.layerSelectionArea.bottom;

        this.selection['end'] = Math.ceil( (this.functionalSliderLength - top) / this.yPerLayer );
        this.selection['start'] = Math.ceil( bottom / this.yPerLayer );

        this.updateLayers(); 
        
    }

    this.updateLayers = () => {}

    container.add( this.layerSlider );
    container.add( this.layerSelectionArea );
    container.add( this.topBall );
    container.add( this.bottomBall );

    return container;

}



export { LayerSelection }