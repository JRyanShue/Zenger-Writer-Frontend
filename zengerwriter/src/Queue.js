import React from 'react';
import './App.css';
import { GcodePreview } from './EditorList.js';
import { QueueHeader } from './QueueHeader.js';

class Queue extends React.Component {

  constructor( props ) {

    super(props);
    this.IP = props.serverIP;
    this.username = props.username;

  }

  render() {

    return (
      
      <div>

        <QueueHeader />

      </div>

    );

  }
  

}

export default Queue;
