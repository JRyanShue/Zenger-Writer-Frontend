
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

function SettingButton ( editor, settingCategory ) {

    var category = settingCategory.toLowerCase();  // Lowercase version for indexing

    // Settings button (e.g. "Quality Settings")
    var button = new UIRow();
	button.setClass( 'option' );
    button.setTextContent( settingCategory + ' Settings' );

    // Create referenced form
    createForm( editor, settingCategory );

    // button toggles form on/off
    button.onClick( function () {

        document.getElementById("screenBlock").style.display = "block";
        document.getElementById(category + "Form").style.display = "block";        

    })

    return button;
}

function createForm( editor, settingCategory ) {

    var category = settingCategory.toLowerCase();  // Lowercase version for indexing

    // createBase();
    let settingsForm = document.createElement("div");
    settingsForm.className = "settings-form";
    settingsForm.id = category + "Form";

    let formContainer = document.createElement("div");
    formContainer.className = "form-container"

    // Relies on the setting category being modified
    let formTitle = document.createElement("h1");
    formTitle.innerHTML = "Modify " + settingCategory + " Settings";

    // Add to container
    formContainer.appendChild(formTitle);

    // Add all settings for given category
    var settings = editor.settings.dict[category];

    for ( var setting in settings ) {

        let settingTitle = document.createElement("label");
        settingTitle.id = setting + "_label";
        settingTitle.innerText = editor.strings.getKey("settings/" + setting);
        let settingField = document.createElement("input");
        settingField.id = setting + "_field";
        settingField.type = "text";
        settingField.value = settings[setting];

        // Add to container
        formContainer.appendChild(settingTitle);
        formContainer.appendChild(settingField);

    }

    let formSubmit = document.createElement("button");
    formSubmit.innerText = "Apply";
    formSubmit.addEventListener("click", function() {

        document.getElementById("screenBlock").style.display = "none";
        document.getElementById(category + "Form").style.display = "none";

        // Set variables
        for ( var setting in settings ) {
            settings[setting] = document.getElementById(setting + "_field").value;

            // Update display values
            document.getElementById( setting + '_display' ).innerText = editor.strings.getKey( 'settings/' + setting ) + ": " + settings[setting];
        }
        
    });

    // Add to container
    formContainer.appendChild(formSubmit);

    // Add container
    settingsForm.appendChild(formContainer);

    // Add complete form
    document.body.append(settingsForm);

}

function createBase() {
    
}

export { SettingButton };