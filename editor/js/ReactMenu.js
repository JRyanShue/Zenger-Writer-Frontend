// import { Menu } from "@szhsin/react-menu"

// import React from "react";

function Slice() {
    console.log("Slicing");
}

class TextField extends React.Component {

}

class SliceButton extends React.Component {


    render() {
        React.createElement("button", {
            onclick: Slice()
        }, "Slice");
    }
}

class HelloWorld extends React.Component {
    render() {
        return React.createElement("h1", null, "Hello World React");
    }
}

class ReactMenu extends React.Component {
    render() {

        return React.createElement(SliceButton, null);
        // return React.createElement(Menu, {
        //     menuButton: /*#__PURE__*/React.createElement(MenuButton, null, "Open menu")
        //   }, /*#__PURE__*/React.createElement(MenuItem, null, "New File"), /*#__PURE__*/React.createElement(MenuItem, null, "Save"), /*#__PURE__*/React.createElement(MenuItem, null, "Close Window"));
    }
}

export { ReactMenu }
