
import { useEffect } from 'react';
import * as THREE from 'three'

import { Banner } from './Top Banner/Banner'

/*
    "Main" function for the editor
*/

function Editor() {

    // var 

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    useEffect(() => {

        var queries = ["?editorURL=", "&username=", "&editorID=", "&editorName="];

        var urlVars = window.location.search.toString();
        var editorURL = urlVars.slice( urlVars.indexOf(queries[0]) + queries[0].length, urlVars.indexOf(queries[1]) );
        var username = urlVars.slice( urlVars.indexOf(queries[1]) + queries[1].length, urlVars.indexOf(queries[2]) );
        var editorID = urlVars.slice( urlVars.indexOf(queries[2]) + queries[2].length, urlVars.indexOf(queries[3]) );
        var editorName = urlVars.slice( urlVars.indexOf(queries[3]) + queries[3].length, urlVars.length );
        editorName = decodeURIComponent(editorName);  // Decode percent encoding
        console.log("URL:", editorURL, "Username:", username, "editorID:", editorID, "editorName:", editorName);


        var banner = new Banner();
        document.body.appendChild( banner.dom )

        // === THREE.JS CODE START ===
        
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // var cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        // camera.position.z = 5;
        // var animate = function () {
        // requestAnimationFrame( animate );
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // renderer.render( scene, camera );
        // };
        // animate();
        // === THREE.JS EXAMPLE CODE END ===

    })

    return (

        <div/>

    )

}

export default Editor

