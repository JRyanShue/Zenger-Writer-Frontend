
import React from 'react';
import { GetEditorData, GetEditorURL } from './API.js';
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

        // Create dropdown containing this.elements
        this.elementsDiv = this.elements.map((element) => {

            return (

                <QueuePlateElement 
                    gcodelist={this}
                    key={element.toString()} 
                    id = {element + RandomID()}
                    name = {element} 
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

            // console.log(this.elements);
            // console.log("queue clicked.");

        };

        this.dragOver = (ev) => {

            ev.preventDefault();
    
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
                        plateName = {JSON.parse(droppedItem)["name"]} 
                        number = "1"
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