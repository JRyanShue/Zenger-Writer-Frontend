
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
        this.name = props.name;

        this.className="preview-img";

    }

    render() {
//className="preview-img-box"
        return( //style={{border:"1px solid red", height:"100px", width:"100px"}}
            <div className="preview-img-box">
                <div 
                    className={this.className}
                    key={this.key}
                    style={{backgroundImage: this.backgroundImage}}
                    onClick={this.onClick}
                >
                    {this.name}
                </div>
            </div>
            
        )

    }

}

export { Preview }