
class ReactMenu extends React.Component {
    render() {
        return React.createElement(Menu, {
            menuButton: /*#__PURE__*/React.createElement(MenuButton, null, "Open menu")
          }, /*#__PURE__*/React.createElement(MenuItem, null, "New File"), /*#__PURE__*/React.createElement(MenuItem, null, "Save"), /*#__PURE__*/React.createElement(MenuItem, null, "Close Window"));
    }
}

export { ReactMenu }
