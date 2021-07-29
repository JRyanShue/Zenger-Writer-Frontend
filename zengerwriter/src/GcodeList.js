import React from 'react';
import './App.css';

class GcodeList extends React.Component {

    constructor (props) {

        super(props);
        this.name = props.name; 

    }

    render () {

        return (
            <div className="App">
              <header className="App-header">
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="/editor/editor"
                  target="_self"  // _blank for new tab
                  rel="noopener noreferrer"
                >
                  Learn {this.name}
                </a>
              </header>
            </div>
        );
        
    }

  
}

export default GcodeList;
