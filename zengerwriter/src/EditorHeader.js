import React from 'react';
import './App.css';
import { SetEditorURL } from './API.js';
// import { NewEditorButton } from './NewEditorButton.js';

class EditorHeader extends React.Component {

    constructor (props) {

        // Initialize
        super(props);
        this.IP = props.IP;
        this.username = props.username;

        this.setURL = function( editorURL ) {
            this.editorURL = editorURL;
        }

        var username = this.username;
        var IP = this.IP;
        this.newEditor = function() {
            
            // New, blank, editor

            // Create ID from date
            if (!Date.now) {
                Date.now = function() { return new Date().getTime(); }
            }
            var editorID = (Math.floor(Date.now() / 1000));

            // Get standard editor template URL
            SetEditorURL( username, IP, editorID, this.setURL.bind(this) )
            .then( () => { 
                console.log("URL::", this.editorURL)
                // setTimeout(() => {
                window.location = "/editor/editor?editorURL=" + this.editorURL + "&username=" + this.username + "&editorID=" + editorID;
                // }, 2000);
                
            } );

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

            <div id="EditorHeader">

                <div className="neweditorlabel">
                    <p>
                        Prepare Models
                    </p>
                </div>
                <div className="neweditorbutton" onClick={this.newEditor.bind(this)}>
                    <p>
                        +
                    </p>
                </div>

            </div>

        );

    }
  
}

export { EditorHeader };
