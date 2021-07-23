/*
    Setting the variables in this class will change the global slicing variables
*/

class SliceSettings {

    constructor() {
        
        // set default print settings

        this.dict = {

            // QUALITY
            "layerHeight" : 1.4,
            "lineWidth" : 0.4,
            
            // SHELL
            "wallThickness" : 0.8,
            "topBottomThickness" : 0.8,
            "topBottomPattern" : "lines",
            "horizontalExpansion" : -0.1,
            "initialLayerHorizontalExpansion" : -0.2,

            // INFILL
            "infillDensity" : 20,
            "infillPattern" : "grid",
            
            // TEMPERATURE
            "hotendTemperature" : 205,
            "bedTemperature" : 50,
            "flow" : 100,

            // SPEED 
            "printSpeed" : 50,
            "wallSpeed" : 25,
            "topBottomSpeed" : 25,
            "travelSpeed" : 150,
            "initialLayerSpeed" : 20,
            "initialLayerTravelSpeed" : 100,

            // TRAVEL
            "enableRetraction" : true,
            "retractionDistance" : 6,
            "retractionSpeed" : 45,
            "combingMode" : "all",

            // COOLING
            "fanSpeed" : 100,
            "initialFanSpeed" : 0,

            // SUPPORT 
            "addSupports" : true,
            "supportStructure" : "normal",
            "supportPlacement" : "touching buildplate",
            "supportOverhangAngle" : 65,
            "supportDensity" : 10,
            "supportZDistance" : 0.2,
            "supportXYDistance" : 0.8,

            // BUILD PLATE ADHESION
            "buildPlateAdhesionType" : "skirt"

        }

    }

    set ( formData ) {

        for ( var setting in this.dict ) {

            console.log(setting, ":", this.dict[ setting ]);
            formData.append( setting, this.dict[ setting ] ); 

        }

    }

}

export { SliceSettings }