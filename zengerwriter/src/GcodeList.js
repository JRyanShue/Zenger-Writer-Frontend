import React from 'react';
import './App.css';
import { test } from './test.js';
import { GetEditorPreview, GetEditors } from './API.js';
import { EditorPreview } from './EditorPreview.js';

class GcodeList extends React.Component {

    constructor (props) {

        // Initialize
        super(props);
        this.IP = props.IP;
        this.username = props.username;
        
        this.editorNumbers = [];

        this.listItems = <li></li>;

        this.state = {
            numbersList: <li></li>
        }

        this.getEditorNumbers().then(
            response =>
            {
                
                console.log(this.editorNumbers);
                // After promise has been resolved:
                // var numbers = this.editorNumbers;
                var numbers = [0, 1, 2, 3, 4];
                this.listItems = numbers.map((numbers) =>
                    <li key="{numbers}">{numbers}</li>  //  key="{numbers}"
                );
                console.log(this.listItems);
                this.setState({
                    numbersList: this.listItems
                });

            }
        );

    }

    componentDidMount() {
        this.setState({
            numbersList: this.listItems
        });
    }

    update () {
        
    }

    async getEditorNumbers() {
        
        await GetEditors(this.IP, this.username)  // API.js functoin to pull from S3
        .then(
            editors => {  // push S3 response into this.editorNumbers

                for (var i = 0; i < editors.length; i++) {
                    console.log(editors[i]);
                    this.editorNumbers.push(editors[i]);
                }

            }
        );
        
        return this.editorNumbers;  // Return to resolve promise

    }

    render () {

        return (
            <div className="App">
                <ul>
                    {this.state.numbersList}
                </ul>
            </div>
        );

    }

  
}

export { GcodeList };
