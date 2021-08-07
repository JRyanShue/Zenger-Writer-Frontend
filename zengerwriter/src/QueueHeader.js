import React from 'react';
import './App.css';
import { SetEditorURL } from './API.js';
import { CreateID } from './ID.js';
// import { NewEditorButton } from './NewEditorButton.js';

class QueueHeader extends React.Component {

    constructor (props) {

        // Initialize
        super(props);
        this.IP = props.IP;
        this.username = props.username;

        this.editorName = "Untitled Plate"

        this.setURL = function( editorURL ) {
            this.editorURL = editorURL;
        }

        var username = this.username;
        var IP = this.IP;

        // New, blank, queue
        this.newQueue = function() {
            


        }

    }

    componentDidMount() {

        this.setState({

            numbersList: this.listItems,
            mounted: true

        });

    }

    render () {

        return (

            <div id="QueueHeader">

            <div className="newqueuelabel">
                <p className="noselect">
                    Build Sequence
                </p>
            </div>
            <div className="newqueuebutton" onClick={this.newQueue.bind(this)}>
                <p className="noselect">
                    +
                </p>
            </div>

            </div>
            
        );

    }
  
}

export { QueueHeader };
