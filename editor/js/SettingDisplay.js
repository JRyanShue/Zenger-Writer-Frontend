
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

function SettingDisplay( editor, setting ) {

    this.setting = setting;  // Keep setting for future reference when altering variable values

    var option = new UIRow();
	option.setClass( 'setting' );

    option.setTextContent( editor.strings.getKey( 'settings/' + setting ) + ": " + editor.settings.dict[setting] );

    return option;

}

export { SettingDisplay };