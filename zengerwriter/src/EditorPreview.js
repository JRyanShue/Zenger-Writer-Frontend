
import React from 'react';
import { GetEditorData } from './API.js';

class Preview extends React.Component {

    /*
        Returns a component with a preview of an editor.
    */

    constructor( props ) {
        
        super( props );
        this.key = props.key;
        this.backgroundImage = props.backgroundImage;

        this.id = props.id;
        this.name = props.name;

        this.className="preview-img";

        this.gcodelist = props.gcodelist;

        this.handleClick = function (  ) {
            GetEditorData( this.gcodelist, this.id );
        };
        
    }

    render() {

        return( 

            <div className="preview-img-box">
                <div 
                    className={this.className}
                    key={this.key}
                    style={{backgroundImage: this.backgroundImage}}
                    onClick={this.handleClick.bind(this)}
                >
                    {this.name}
                </div>
            </div>
            
        )

    }

}

export { Preview }