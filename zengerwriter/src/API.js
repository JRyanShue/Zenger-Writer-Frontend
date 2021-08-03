

async function GetEditors ( IP, username ) {

    /* 
        Get all projects for a specified user
        Projects are then sorted by date last used, and another request is sent to get their contents. 
    */

    console.log("Getting project list from username:", username);

    // Headers
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    headers.append('username', username);

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

            var project_numbers = data['project_numbers'];
            console.log('keys:', project_numbers);
            for (var i = 0; i < project_numbers.length; i++){
                console.log('at i:', project_numbers[i]);
                values.push(project_numbers[i]);
            }
            
        }
    ).catch( function () {
        console.log('error');
    });

    console.log("values:", values);
    return values;

}

async function GetEditorPreviewUrl ( IP, User, EditorID, gcodepreviews ) {

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + User + '/projects/' + EditorID);
    headers.append('Content-Type', 'application/json');

    await fetch( 'http://' + IP + '/get_object', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    }).then(
        (response) => response.json()
    ).then(
        data => {
            
            console.log("data from API:", data);
            var img_url = data['url'];
            var name = data['name'];

            // Important callback call
            gcodepreviews.setPreview(EditorID, name, img_url, gcodepreviews);

            return "OK";

        }
    );

}


async function GetEditorData ( gcodelist, EditorID ) {

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + gcodelist.username + '/projects/' + EditorID + '/editor.json');
    headers.append('Content-Type', 'application/json');

    await fetch( 'http://' + gcodelist.IP + '/pull_object', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    }).then(
        (response) => response.json()
    ).then(
        data => {
            
            var editor = data['body'];
            console.log("editor:", editor);

            return "OK";

        }
    );

}


async function GetEditorURL ( gcodelist, editorID ) {

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + gcodelist.username + '/projects/' + editorID);
    headers.append('Content-Type', 'application/json');

    await fetch( 'http://' + gcodelist.IP + '/pull_object_url', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    }).then(
        (response) => response.json()
    ).then(
        data => {
            
            // console.log("data from API:", data);
            var url = data['url'];
            console.log("editor url:", url);

            gcodelist.enterEditor( url, gcodelist.username, editorID ); 
            return "OK";

        }
    );
}


async function SetEditorURL ( username, IP, editorID, setURL ) {

    // Only sets URL with callback ( no action otherwise )

    // If requested editor doesn't exist, initialize a new one with the specified path. 

    // Headers
    console.log("SetEditorURL")

    setTimeout(() => {
        
    }, 1000);

    var headers = new Headers(); 
    headers.append('path', 'Users/' + username + '/projects/' + editorID);
    headers.append('Content-Type', 'application/json');

    await fetch( 'http://' + IP + '/pull_object_url', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    }).then(
        (response) => response.json()
    ).then(
        data => {
            
            // console.log("data from API:", data);
            var url = data['url'];

            console.log("GOT URL::", url)

            setURL( url );

            return "OK";
            
            

        }
    );
}


export { GetEditorPreviewUrl, GetEditors, GetEditorData, GetEditorURL, SetEditorURL }