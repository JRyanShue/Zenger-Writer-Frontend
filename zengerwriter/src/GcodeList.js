import React from 'react';
import './App.css';
import { test } from './test.js';
import { GetEditorPreview, GetEditors } from './API.js';
import { EditorPreview } from './EditorPreview.js';

class GcodeList extends React.Component {

    constructor (props) {

        super(props);
        this.IP = props.IP;
        this.username = props.username;

        // console.log(test());

        // console.log(GetEditors);

        console.log("project numbers:", GetEditors(this.IP, "testman"));
        
        this.editorNumbers = [];
        this.getEditorNumbers().then(
            response =>
            {
                console.log("editorNumbers:", this.editorNumbers);
                console.log("ed0", this.editorNumbers[0]);
                console.log('lenn', this.editorNumbers.length);
                for (var i = 0; i < this.editorNumbers.length; i++) {
                    console.log("a");
                    console.log("item", this.editorNumbers[i]);
                }
                this.editors = "editors";  // editorNumbers || 
            }
        );
        // this.getEditorNumbers().then(
        //     // data_ => JSON.stringify(data_)
        //     // response => response.json()
        //     // data_ => console.log(data_)
        //     response => console.log(response)
        //     // values => console.log(values)
        // ).then(
        //     data => 
        //     {
        //         for (var i in data) {
        //             editorNumbers.push(i);
        //         }
        //     }
        // );
        
        // this.array = [1, 2, 3];
        // this.editors = "editors";

    }

    async getEditorNumbers() {
        console.log('asgd');
        var editors = await GetEditors(this.IP, this.username)
        .then(
            editors => {
                console.log(editors);
                console.log("0", editors[0]);
                console.log("len:", editors.length);
                for (var i = 0; i < editors.length; i++) {
                    console.log(editors[i]);
                    this.editorNumbers.push(editors[i]);
                }
                // console.log("type:", typeof editors)
                // for (var i in editors) {
                //     this.editorNumbers.push(i);
                // }
            }
        );
        console.log("editors:", this.editorNumbers);
        // console.log(typeof editors);
        // // return JSON.parse(editors)
        // return editors.toString();
        return this.editorNumbers;
    }

    render () {

        return (
            <div className="App">
                <EditorPreview />
                <p>
                    {this.editors}
                </p>
                <header className="App-header">

                    <a
                        className="App-link"
                        href="/editor/editor"
                        target="_self"  // _blank for new tab
                        rel="noopener noreferrer"
                    >
                        New Project. 
                    </a>

                </header>
            </div>
        );

    }

  
}

export { GcodeList };
