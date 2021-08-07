import React, { useState } from 'react';
import './App.css';
import { GetQueueInfo, GetQueueKeys } from './API.js';
import { Preview } from './EditorPreview.js';
import { QueueElement } from './QueueElement';
import { CreateID } from './ID';

class QueueList extends React.Component {

    constructor (props) {

        // Initialize
        super(props);

        // Common info for API calls
        this.IP = props.IP;
        this.username = props.username;
        
        // Keys of all queues in existence for user
        this.queueKeys = [];

        // User's queues to display to the screen
        this.queues = {};

        this.listItems = <div>Loading...</div>;

        this.state = {

            queuesList: <div></div>,
            mounted: false

        }

        // for communication with the QueueHeader parent element
        this.setQueueList = props.setQueueList;

        /*
            setQueue method gets passed into callbacks:
            This object is passed into a fetch() which, after pulling the info for the queue, adds a 
            corresponding object to this.queues. 
        */

        this.setQueue = function(id, info, queueList) {

            console.log("id:", id)

            console.log("INFO!", info)
            // console.log("name:", info["0"]["name"])
            // queueList.queues[id] = {'name': info[0]["plateName"]};
            queueList.queues[id] = {'name': info["name"]};

        }

        // Create new queue for queue name
        this.addQueue = ( queueInfo ) => {
    
            let newID = CreateID();
            this.queueKeys.push( newID );
            this.setQueue( newID, queueInfo, this );
            // console.log(this.listItems)
            // this.listItems.append( this.createQueueElement( this, newID, QueueName ) )

            this.listItems = this.queueKeys.map((keys) =>

                // set component
                {
                    let name = this.queues[keys]['name'];
                    // console.log("Creating element with name:", name);
                    return (

                        this.createQueueElement( this, keys, name )

                    )
                }

            );

            this.setState({

                queuesList: this.listItems

            })
    
        }

        // Pull the keys of all the queues; use them to pull every queue of the user
        this.getQueueKeys().then(

            response =>
            {
                
                // Sort Queue ID's backwards to get the most recent documents first
                this.queueKeys.sort();
                this.queueKeys.reverse();                

                // Object with preview URLs
                var keys = this.queueKeys;  // queueKeys has been set by callback
                for (var i = 0; i < keys.length; i++) {
                    this.queues[keys[i]] = SetQueueInfo(this.IP, this.username, keys[i], this);
                }

                // Wait for all Queues' info to be obtained
                Promise.all( Object.values(this.queues) ).then( (values) => {

                    // Create elements
                    this.listItems = keys.map((keys) =>

                        // set component
                        {
                            let name = this.queues[keys]['name'];
                            // console.log("Creating element with name:", name);
                            return (

                                this.createQueueElement( this, keys, name )

                            )
                        }

                    );

                    console.log("LISTITEMS:", this.listItems)

                    // console.log('items:', this.listItems);
                    this.state = {

                        queuesList: this.listItems,
                        mounted: this.state.mounted

                    };

                    // Prevent setState before component is mounted
                    // console.log('mounted?', this.state.mounted)
                    if (this.state.mounted) {

                        this.setState({
                            queuesList: this.listItems,
                            mounted: this.state.mounted
                        });

                    }
                });

            }
        );

        // Form connection with QueueHeader
        this.setQueueList( this );

    }

    componentDidMount() {

        this.setState({

            queuesList: this.listItems,
            mounted: true

        });

    }

    update () {
        
    }

    // Get keys for all queues in existence for user
    async getQueueKeys() {
        
        await GetQueueKeys(this.IP, this.username)  // API.js function for S3
        .then(

            queues => {  // push S3 response into this.queueKeys

                for (var i = 0; i < queues.length; i++) {
                    // console.log(queues[i]);
                    this.queueKeys.push(queues[i]);
                }

            }

        );
        
        return this.queueKeys;  // Return to resolve promise

    }

    createQueueElement( queuelist, key, name ) {

        return (
            <QueueElement 
                queuelist={queuelist}
                key={key.toString()} 
                id = {key}
                name = {name} 
                elements = {[]}  // "2_Reservoir A", "5_Reservoir B", "3_Benchy"
            />
        )
        
    }

    

    render () {

        return (
            
            <div id="QueueList">
            
                <p className="noselect">
                    Ordered by last modified
                </p>

                {this.state.queuesList}

            </div>            

        );

    }
  
}

async function SetQueueInfo( IP, Username, QueueID, QueueList ) {

    // Get the info of the specified Queue ID (sets variable via callback)
    await GetQueueInfo( IP, Username, QueueID, QueueList ).then( () => {

        return "OK";

    })

}

export { QueueList };
