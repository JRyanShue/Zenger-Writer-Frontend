import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Queue from './Queue';
import Prepare from './Prepare';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Queue username="testman" serverIP="172.31.103.234"/>
    <Prepare username="testman" serverIP="172.31.103.234"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
