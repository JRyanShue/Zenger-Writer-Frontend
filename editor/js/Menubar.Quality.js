
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';
import { SettingDisplay } from './SettingDisplay.js';
import { SettingButton } from './SettingButton.js';

function MenubarQuality( editor ) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/quality' ) );
	container.add( title );

	var options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

    // Settings Button
    var settingButton = new SettingButton( editor );
    settingButton.onClick( function () {

        console.log("opening settings form");

        let settingsForm = document.createElement("div");
        settingsForm.className = "settings-form";
        settingsForm.id = "qualityForm";

        let formContainer = document.createElement("form");
        formContainer.action = setVariables();
        formContainer.className = "form-container"

        let formTitle = document.createElement("h1");
        formTitle.innerHTML = "Modify Settings";

        formContainer.appendChild(formTitle);
        settingsForm.appendChild(formContainer);

        let testHolder = document.createElement("div");
        testHolder.className = "settings-form";
        testHolder.id = "qualityForm";
        let testP = document.createElement("p");
        // testP.action = setVariables();
        // testP.className = "form-container";
        testP.innerHTML = "Hello World.";
        testHolder.appendChild(testP);
        document.body.append(testHolder);

        document.body.append(settingsForm);


    })
    options.add( settingButton );

    //
	options.add( new UIHorizontalRule() );

	// Layer Height
	options.add( new SettingDisplay( editor, "layer_height" ) );

	// Line Width
	options.add( new SettingDisplay( editor, "line_width" ) );

    function setVariables() {
        console.log("setting variables");
        // var firstName = document.getElementsByName("firstname")[0].value;
    }

	return container;

}

export { MenubarQuality };
