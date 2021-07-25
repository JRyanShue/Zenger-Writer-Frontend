
import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

function SettingButton ( editor ) {

    var button = new UIRow();
	button.setClass( 'option' );

    button.setTextContent( 'Settings' );

    return button;
}

export { SettingButton };