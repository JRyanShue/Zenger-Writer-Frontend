/*
    Setting the variables in this class will change the global slicing variables
*/

class SliceSettings {

    constructor() {
        
        // set default print settings

        // QUALITY
        this.layerHeight = 0.2;
        this.lineWidth = 0.4;
        
        // SHELL
        this.wallThickness = 0.8;
        this.topBottomThickness = 0.8;
        this.topBottomPattern = "lines";
        this.horizontalExpansion = -0.1;
        this.initialLayerHorizontalExpansion = -0.2;

        // INFILL
        this.infillDensity = 20;
        this.infillPattern = "grid";
        
        // TEMPERATURE
        this.hotendTemperature = 205;
        this.bedTemperature = 50;
        this.flow = 100;

        // SPEED 
        this.printSpeed = 50;
        this.wallSpeed = 25;
        this.topBottomSpeed = 25;
        this.travelSpeed = 150;
        this.initialLayerSpeed = 20;
        this.initialLayerTravelSpeed = 100;

        // TRAVEL
        this.enableRetraction = true;
        this.retractionDistance = 6;
        this.retractionSpeed = 45;
        this.combingMode = "all";

        // COOLING
        this.fanSpeed = 100;
        this.initialFanSpeed = 0;

        // SUPPORT 
        this.addSupports = true;
        this.supportStructure = "normal";
        this.supportPlacement = "touching buildplate";
        this.supportOverhangAngle = 65;
        this.supportDensity = 10;
        this.supportZDistance = 0.2;
        this.supportXYDistance = 0.8;

        // BUILD PLATE ADHESION
        this.buildPlateAdhesionType = "skirt";

    }

}

export { SliceSettings }