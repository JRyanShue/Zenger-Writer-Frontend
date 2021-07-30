
import React from 'react';

class Preview extends React.Component {

    /*
        Returns a component with a preview of an editor.
    */

    constructor( props ) {
        
        super( props );
        this.key = props.key;
        this.backgroundImage = props.backgroundImage;
        this.onClick = props.onClick;
        this.id = props.id;

        this.className="preview-img";

    }

    render() {

        return(
            <div 
                className={this.className}
                key={this.key}
                style={{backgroundImage: this.backgroundImage}}
                onClick={this.onClick}
            >
                {this.id}
            </div>
        )

    }

}

export { Preview }