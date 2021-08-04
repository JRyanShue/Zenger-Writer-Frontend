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

        // New, blank, editor
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

                <div className="neweditorlabel">
                    <p>
                        Production Queue
                    </p>
                </div>
                <div className="neweditorbutton" onClick={this.newQueue.bind(this)}>
                    <p>
                        +
                    </p>
                </div>

            </div>

        );

    }
  
}

export { QueueHeader };
