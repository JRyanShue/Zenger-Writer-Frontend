import React from 'react';
import './App.css';

class Slice extends React.Component {

  constructor( props ) {

    super(props);
    this.IP = props.serverIP;
    this.username = props.username;

  }

  render() {

    return (
      
      <div>

        <div className="sliceBox">
            
            <div className="sliceText">
                <p className="noselect">
                    SLICE
                </p>
            </div>
            {/* <div id="newqueuebutton" className="newqueuebutton">
                <p className="noselect">
                    +
                </p>
            </div> */}

        </div>        

      </div>

    );

  }
  

}

export default Slice;
