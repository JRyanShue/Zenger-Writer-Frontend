
import React from 'react';
import { GetEditorData, GetEditorURL } from './API.js';
import { QueuePlateElement } from './QueuePlateElement.js'

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
                    id = {element}
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

                if ( this.state.display == "none" ) {

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

            console.log(this.elements);
            console.log("queue clicked.");

        };
        
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

                <div className="queue-box" onClick={this.handleClick.bind(this)}>
                    <div 
                        className={this.className}
                        key={this.key}
                    >
                        {this.name} 
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