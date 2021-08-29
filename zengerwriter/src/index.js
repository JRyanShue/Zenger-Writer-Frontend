import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Queue from './Queue';
import Prepare from './Prepare';
import Slice from './Slice';

import reportWebVitals from './reportWebVitals';

var username = "testman";

// IP of EC2: 54.159.145.255
// IP of local Linux: 172.23.75.78

ReactDOM.render(
  <React.StrictMode>
    <Slice username={username} serverIP="54.159.145.255"/>
    <Queue username={username} serverIP="54.159.145.255"/>
    <Prepare username={username} serverIP="54.159.145.255"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
