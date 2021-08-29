import { useRef } from "react"

function NavElement(props) {

    var name = useRef(props.name);
    function handleClick() {
        props.handleClick();
    }

    return (
        <div onClick={handleClick} >

            <div class="noselect">
                {name.current}
            </div>            

        </div>
    )
}

export { NavElement }