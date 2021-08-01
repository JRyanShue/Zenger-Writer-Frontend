
async function Save ( editor ) {  // Saves editor to cloud

    var data = editor.toJSON();
    
    // Build FormData object from data
    let formData = new FormData();
    console.log("saving data:", data);
    formData.append( 'editor', data );

    console.log("form:", formData);

    console.log("username:", editor.username);

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + editor.username + '/projects/' + editor.editorID + '/editor.json');
    headers.append('isfile', 'false');
    headers.append('Content-Type', 'application/json');

    const response = await fetch( 'http://' + editor.IP + '/put_object', {

        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header

    }).then(

        (response) => { 

            console.log(response);
            editor.signals.savingFinished.dispatch();

        }

    );

}

// Saves file to preview path for given editor
async function SavePreview( file, editor ) {

    // Build FormData object from data
    let formData = new FormData();
    console.log("FILE:", file);
    // File is appended
    var blob = new Blob([file], {type:"image/png"});
    console.log('BLOB::', blob)
    formData.append( 'file', blob, "preview.png" );
    console.log("FORM:", formData);

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + editor.username + '/projects/' + editor.editorID + '/preview.png');
    headers.append('isfile', 'true');
    // headers.append('Content-Type', 'application/octet-stream');
    // headers.append('Content-Type', 'image/png');

    const response = await fetch( 'http://' + editor.IP + '/put_object', {

        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData  // JSON.stringify(data) // body data type must match "Content-Type" header

    });

}

async function Slice( editor, IP, saveString ) {

    // Use to ensure changes register
    console.log( "\(v1.1\) Slicing STL..." );

    // Generate STL blob from build plate
    var { STLExporter } = await import( '../../examples/jsm/exporters/STLExporter.js' );
    var exporter = new STLExporter();
    var buffer = exporter.parse( editor.scene, { binary: true } );
    var blob = new Blob( [ buffer ], { type: 'application/octet-stream' } );

    // Build FormData object
    let formData = new FormData();
    await buildFormData ( editor, formData, blob );
    await sliceSTL( IP, formData );
    fetchGcode( IP, saveString );

}

async function buildFormData ( editor, formData, blob ) {

    formData.append( 'stl', blob, 'modelSTL.stl' );
    formData.append( 'action', "slice" );

    editor.settings.set( formData );

}

async function sliceSTL ( IP, formData ) {

    // Send FormData to backend for slicing
    const response = await fetch( 'http://' + IP + '/put_stl',
    {
        method: 'POST',
        body: formData,
    } );

}

async function fetchGcode( IP, saveString ) {

    await fetch( 'http://' + IP + '/get_gcode' ) // get_gcode
        .then( response => response.text() )  // use .text() because it's a gcode file, not JSON
        .then( value => {
            returnGcode( value, saveString );
        })  // callback for handling gcode value)

}

function returnGcode( gcode, saveString ) {

    console.log( gcode );
    saveString( gcode, "model.gcode" );

}

export { Save, SavePreview, Slice };