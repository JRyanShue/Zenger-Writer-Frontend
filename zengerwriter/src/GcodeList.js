import React from 'react';
import './App.css';
import { GetEditorPreview } from './API.js';
import { EditorPreview } from './EditorPreview.js';

class GcodeList extends React.Component {

    constructor (props) {

        super(props);
        this.IP = props.IP;
        this.name = props.name; 

    }

    render () {

        return (
            <div className="App">
                <EditorPreview /> 
                <header className="App-header">
                
                    <a
                        className="App-link"
                        href="/editor/editor"
                        target="_self"  // _blank for new tab
                        rel="noopener noreferrer"
                    >
                        New Project. 
                    </a>

                </header>
            </div>
        );

    }

  
}

export { GcodeList };
