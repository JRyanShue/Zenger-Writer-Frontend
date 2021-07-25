
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';
import { SettingDisplay } from './SettingDisplay.js';
import { SettingButton } from './SettingButton.js';

function MenubarSettingCategory( editor, settingCategory ) {

	this.settingCategory = settingCategory;

	var category = settingCategory.toLowerCase();  // Lowercase version for indexing

	var strings = editor.strings;

	// Base (label based on category)
	var container = new UIPanel();
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/' + category ) );
	container.add( title );

	var options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

    // Settings Button
    var settingButton = new SettingButton( editor, this.settingCategory );
    options.add( settingButton );

    // HR
	options.add( new UIHorizontalRule() );

	// Add setting labels
    for ( var setting in editor.settings.dict[ category ] ) {
        options.add( new SettingDisplay( editor, setting, editor.settings.dict[ category ][ setting ] ) );
    }

	return container;

}

export { MenubarSettingCategory };
