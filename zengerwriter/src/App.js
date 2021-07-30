import React from 'react';
import './App.css';
import { GcodePreview } from './GcodeList.js';

class App extends React.Component {

  constructor( props ) {

    super(props);
    this.IP = "172.28.150.81";

  }

  render() {

    return (
      
      <div className="App">
        <GcodePreview IP={this.IP} username="testman"/>
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
            Learn React
          </a>
        </header>
      </div>
    );

  }
  

}

export default App;
