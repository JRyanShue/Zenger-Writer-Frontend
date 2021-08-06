
import React from 'react';
import { GetEditorData, GetEditorURL } from './API.js';

class QueuePlateElement extends React.Component {

    /*
        Returns a component with the info of a queue.
    */

    constructor( props ) {
        
        super( props );
        this.key = props.key;

        this.id = props.id;
        this.name = props.name;

        // Separate number from plate name
        this.number = this.name.slice(0, this.name.indexOf("_"));
        this.plateName = this.name.slice(this.name.indexOf("_")+1)

        this.className="queue";

        this.queuelist = props.queuelist;

        this.handleClick = function () {

            console.log("queue plate clicked.");

        };
        
    }

    render() {

        return( 

            <div className="queue-box" onClick={this.handleClick.bind(this)}>
                {this.plateName}
            </div>
            
        )

    }

}

export { QueuePlateElement }