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
      
      <div>
        <GcodePreview IP={this.IP} username="testman" />
      </div>
    );

  }
  

}

export default App;
