
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

function SettingButton( editor, setting ) {

    this.setting = setting;  // Keep setting for future reference when altering variable values

    var option = new UIRow();
	option.setClass( 'option' );

    console.log('settings/' + setting);
    console.log(editor.settings.dict[setting]);
    option.setTextContent( editor.strings.getKey( 'settings/' + setting ) + ": " + editor.settings.dict[setting] );
	option.onClick( function () {


	} );

    return option;
}

export { SettingButton };