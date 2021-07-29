

async function GetEditors ( IP, User ) {



}

async function GetEditorPreview ( IP, User, EditorID ) {

    // Build FormData object from data
    let formData = new FormData();
    // console.log("User:", User);
    formData.append("User:", User);
    formData.append( 'EditorID', EditorID );

    console.log("form:", formData);

    const response = await fetch( 'http://' + IP + '/get_object', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(
        (response) => { console.log(response); }
    );

}