
// import React from 'react';

import * as THREE from '../../build/three.module.js';

import { UIPanel, UIRow, UIHorizontalRule, UISelect, UITabbedPanel, UICheckbox, UIListbox, ListboxItem } from './libs/ui.js';

function MenubarPreferences( editor ) {

    // const e = React.createElement;

    var config = editor.config;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu' );

    var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/preferences' ) );
	container.add( title );

    var options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

    // Theme

    var theme = new UIPanel();
	theme.setClass( 'menu' );
    options.add(theme);

    var themetitle = new UIPanel();
	themetitle.setClass( 'title' );
	themetitle.setTextContent( "Theme" );
	theme.add( themetitle );

    var as = new UIPanel();
	as.setClass( 'options' );
	theme.add( as );


    // var option = new UIListbox();
	// option.setClass( 'options' );
	// option.setTextContent( "Theme" );
    // option.items = 
    //     [
    //         "Dark",
    //         "Light"
    //     ];
    // option.setMultiple( true );

	// options.add( option );


    var option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/help/about' ) );
	option.onClick( function () {

		window.open( 'https://threejs.org', '_blank' );

	} );
	as.add( option );

    return container;

}

export { MenubarPreferences }