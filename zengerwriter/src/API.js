
// Saves info.json for specified queue
async function SaveInfo( info_json, username, queueID, IP ) {

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + username + '/queues/' + queueID + '/info.json');
    headers.append('Content-Type', 'application/json');

    const response = await fetch( 'http://' + IP + '/put_json', {

        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(info_json)  // JSON.stringify(data) // body data type must match "Content-Type" header

    });

}


async function GetQueueKeys ( IP, username ) {

    /* 
        Get all queues for a specified user
        Queues are then sorted by date last used, and another request is sent to get their contents. 
    */

    console.log("Getting queue list from username:", username);

    // Headers
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    headers.append('username', username);

    console.log("headers:", headers);

    var values = [];
    var data_;

    const response = await fetch( 'http://' + IP + '/get_queues', {
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

            var queue_numbers = data['queue_numbers'];
            console.log('queue numbers:', queue_numbers);
            for (var i = 0; i < queue_numbers.length; i++){
                console.log('at i:', queue_numbers[i]);
                values.push(queue_numbers[i]);
            }
            
        }
    ).catch( function () {
        console.log('error');
    });

    console.log("values:", values);
    return values;

}


async function GetQueueInfo ( IP, Username, QueueID, QueueList ) {

    /* 
        Using ID, get queue name. Sets via callback
    */

    // Headers
    var headers = new Headers(); 
    headers.append('path', 'Users/' + Username + '/queues/' + QueueID + '/info.json');
    headers.append('Content-Type', 'application/json');

    await fetch( 'http://' + IP + '/pull_object', {
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
            var info = data['body'];
            console.log("INFO::", info)

            // Important callback call
            QueueList.setQueue(QueueID, info, QueueList);

            return "OK";

        }
    );

}


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


async function GetEditorURL ( gcodelist, editorID, editorName ) {

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

            gcodelist.enterEditor( url, gcodelist.username, editorID, editorName ); 
            return "OK";

        }
    );
}


async function SetEditorURL ( username, IP, editorID, setURL ) {

    // Only sets URL with callback ( no action otherwise )

    // If requested editor doesn't exist, initialize a new one with the specified path. 

    // Headers
    console.log("SetEditorURL")

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


export { SaveInfo, GetEditorPreviewUrl, GetQueueInfo, GetEditors, GetQueueKeys, GetEditorData, GetEditorURL, SetEditorURL }