

async function GetEditors ( IP, username ) {

    /* 
        Get all projects for a specified user
        Projects are then sorted by date last used, and another request is sent to get their contents. 
    */

    // let formData = new FormData();
    console.log("Getting project list from username:", username);

    // Headers
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    headers.append('username', username);

    // formData.append("username", username);

    console.log("headers:", headers);

    var values = [];
    var data_;

    const response = await fetch( 'http://' + IP + '/get_projects', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }).then(
        response => response.json()
    ).then(
        data => {

            data_ = data;
            var project_numbers = data['project_numbers'];
            console.log('keys:', project_numbers);
            for (var i = 0; i < project_numbers.length; i++){
                console.log(project_numbers[i]);
                values.push(project_numbers[i]);
            }
            
        }
    ).catch( function () {
        console.log('error');
    });

    console.log("type:", typeof values);
    console.log("values:", values);
    return values;
    // return response;
    // return data_

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

export { GetEditorPreview, GetEditors }