import React from 'react';
import './App.css';
import { GcodePreview } from './EditorList.js';
import { QueueHeader } from './QueueHeader.js';
import { QueueList } from './QueueList.js';

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
        <QueueList IP={this.IP} username={this.username}/>

      </div>

    );

  }
  

}

export default Queue;
