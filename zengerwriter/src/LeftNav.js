
import { NavElement } from './NavElement'

function LeftNav(props) {

    var setApp = props.setApp;
    console.log(setApp)

    var queueNav = <NavElement name="Queue" handleClick={() => {
        setApp('queue');
    }}/>;
    var manageNav = <NavElement name="Manage" handleClick={() => {
        setApp('manage');
    }}/>;

    return (
        <div className="leftNav">
            
            {queueNav}
            {manageNav}

        </div>
    )
}

export { LeftNav }