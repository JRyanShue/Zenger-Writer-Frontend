import React from 'react';
import './App.css';

class Slice extends React.Component {

  constructor( props ) {

    super(props);
    this.IP = props.serverIP;
    this.username = props.username;

    this.drop = ( ev ) => {

        const droppedItem = ev.dataTransfer.getData("application/json");
        if (droppedItem) {

            sliceItem( droppedItem );

        }        

    }

    this.dragOver = (ev) => {

        ev.preventDefault();

    }

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
            <div id="sliceBucket" className="sliceBucket" onDragOver={this.dragOver} onDrop={this.drop}>

            </div>

        </div>        

      </div>

    );

  }
  
}

function sliceItem( item ) {

    console.log("Slicing item:", item)

    

}

export default Slice;
