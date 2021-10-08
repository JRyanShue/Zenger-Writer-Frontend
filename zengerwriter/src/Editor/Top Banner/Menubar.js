import { UIPanel } from '../libs/ui.js';

import { MenubarHome } from './Menubar.Home.js';
import { MenubarDivider } from './Menubar.Divider.js';
import { MenubarSlice } from './Menubar.Slice.js';
import { MenubarFile } from './Menubar.File.js';
import { MenubarView } from './Menubar.View.js';
import { MenubarHelp } from './Menubar.Help.js';
import { MenubarNameRename } from './Menubar.NameRename.js';
import { MenubarSettingCategory } from './Menubar.SettingCategory.js';

function Menubar( editor ) {

	var container = new UIPanel();
	container.setId( 'menubar' );

	container.add( new MenubarHome( editor ) );

	// Name/rename textfield
	container.add( new MenubarNameRename( editor ) )

	container.add( new MenubarSlice( editor ) );
	container.add( new MenubarFile( editor ) );
	container.add( new MenubarView( editor ) );
	container.add( new MenubarHelp( editor ) );

	container.add( new MenubarDivider( editor ) );

	// Add setting menus
	for ( const setting in editor.settings.dict ) {

		container.add( new MenubarSettingCategory( editor, editor.strings.getKey('menubar/' + setting) ) );
		
	}

	return container;

}

export { Menubar };
