
import React from 'react';
import { SaveInfo } from './API.js';
import { QueuePlateElement } from './QueuePlateElement.js'
import { PreciseID, RandomID } from './ID.js'

class QueueElement extends React.Component {

    /*
        Returns a component with the info of a queue.
    */

    constructor( props ) {
        
        super( props );
        this.key = props.key;

        this.id = props.id;
        this.name = props.name;

        this.className="queue";

        this.queuelist = props.queuelist;

        this.elements = props.elements;

        // INFO ON ELEMENTS
        this.elementsInfo = {}

        // Create dropdown containing this.elements
        this.elementsDiv = this.elements.map((element) => {

            var name = element;

            var number = name.slice(0, name.indexOf("_"));
            var plateName = name.slice(name.indexOf("_")+1);

            return (

                <QueuePlateElement
                    gcodelist={this}
                    key={element.toString()}
                    id = {element + RandomID()}
                    number = {number}
                    plateName = {plateName}
                />

            )

        })

        this.state = {

            numbersList: <div></div>,
            mounted: false,
            display: "none"

        }

        this.handleClick = function () {

            // Toggle dropdown items on and off
            if (this.state.mounted) {

                console.log(this.state.display)

                if ( this.state.display == "none" ) {

                    console.log(this.state.display)

                    this.setState({

                        numbersList: this.elementsDiv,
                        mounted: true,
                        display: "block"
            
                    });

                }
                else {

                    this.setState({

                        numbersList: this.elementsDiv,
                        mounted: true,
                        display: "none"
            
                    });
                    
                }

            }

            console.log(this.elementsDiv);
            for ( var key in this.elementsDiv ) {

                var order = key; 

                console.log("ID", this.elementsDiv[key]["props"]["id"]);

                // Number can be changed
                var number;
                if (this.elementsInfo[this.elementsDiv[key]["props"]["id"]]) {
                    number = this.elementsInfo[this.elementsDiv[key]["props"]["id"]]["number"];
                }
                else {
                    number = this.elementsDiv[key]["props"]["number"];
                }
                console.log("Number", number);

                console.log("plateName", this.elementsDiv[key]["props"]["plateName"]);
                console.log("rootID", this.elementsDiv[key]["props"]["rootID"]);

            }

            this.save();

        };

        this.dragOver = (ev) => {

            ev.preventDefault();
    
        }

        // CALLBACK FOR SETTING INFO. Needed to change the amount of an item in the queue, because props is static. 
        this.setInfo = ( id, number ) => {

            this.elementsInfo[id] = {"number": number};

        }
          
        this.drop = (ev) => {
    
            const droppedItem = ev.dataTransfer.getData("application/json");
            if (droppedItem) {

                // Update elements with dropped item's data
                this.elementsDiv.push(

                    <QueuePlateElement 
                        gcodelist={this}
                        key={JSON.parse(droppedItem)["name"].toString()} 
                        id = {PreciseID()}  // Completely unique ID
                        rootID = {JSON.parse(droppedItem)["id"].toString()}  // ID of the element
                        plateName = {JSON.parse(droppedItem)["name"]} 
                        number = "1"
                        setInfo = {this.setInfo} // Callback for changing number of item
                    />

                )

                // Update internal state
                this.setState({

                    numbersList: this.elementsDiv

                })

            }
    
        }
        
    }


    componentDidMount() {

        this.setState({

            numbersList: this.elementsDiv,
            mounted: true,
            display: "none"

        });

    }

    save() {

        // Convert all necessary data into JSON
        var queueData = {};
        var data = {};

        for ( var key in this.elementsDiv ) {

            var order = key; 

            var ID = this.elementsDiv[key]["props"]["id"];

            // Number can be changed
            var number;
            if (this.elementsInfo[this.elementsDiv[key]["props"]["id"]]) {
                number = this.elementsInfo[this.elementsDiv[key]["props"]["id"]]["number"];
            }
            else {
                number = this.elementsDiv[key]["props"]["number"];
            }

            var plateName = this.elementsDiv[key]["props"]["plateName"];
            var rootID = this.elementsDiv[key]["props"]["rootID"];

            // add to data
            queueData[order] = {
                "ID": ID,
                "number": number,
                "plateName": plateName,
                "rootID": rootID
            }

        }

        data = {
            "name": this.name,
            "id": this.id,
            "queues": queueData
        }
    
        // console.log( "IP:", this.queuelist.IP )
        SaveInfo( data, this.queuelist.username, this.id, this.queuelist.IP );
        // console.log("SAVING:", this);
    }


    render() {

        return( 

            <div>

                <div onDragOver={this.dragOver} onDrop={this.drop} className="queue-box" onClick={this.handleClick.bind(this)}>
                    <div 
                        className={this.className}
                        key={this.key}
                    >
                        <div className="noselect">
                            {this.name} 
                        </div>
                    </div>
                    <div className="arrow" style={{marginBottom: "5px", right: "10px"}}></div>
                </div>

                <div style={{display: this.state.display}}>
                    {this.state.numbersList}
                </div>

            </div>
            
            
        )

    }

}

export { QueueElement }