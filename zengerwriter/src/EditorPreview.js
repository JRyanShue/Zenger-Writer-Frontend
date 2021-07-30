
import React from 'react';
import { GetEditorPreviewUrl } from './API.js';

async function SetEditorPreview( IP, User, EditorID, gcodelist ) {

    // Get the preview of the specified editor ID
    var url;
    url = await GetEditorPreviewUrl( IP, User, EditorID, gcodelist ).then(response => {
        // console.log(url);

        // return calls next action in sequence
        return "OK";
    })
    // .catch(err => {
    //     console.log("Failed to connect");
    // });

}


export { SetEditorPreview }