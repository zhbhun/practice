'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _ListSubheader = require('@material-ui/core/ListSubheader');

var _ListSubheader2 = _interopRequireDefault(_ListSubheader);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _BackButton = require('./BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  toolbarTitle: {
    flexGrow: 1
  }
};

var Setting = function Setting(_ref) {
  var classes = _ref.classes,
      match = _ref.match;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _AppBar2.default,
      { position: 'sticky' },
      _react2.default.createElement(
        _Toolbar2.default,
        null,
        _react2.default.createElement(_BackButton2.default, null),
        _react2.default.createElement(
          _Typography2.default,
          {
            variant: 'title',
            color: 'inherit',
            className: classes.toolbarTitle
          },
          '\u8BBE\u7F6E'
        )
      )
    ),
    _react2.default.createElement(
      _List2.default,
      { subheader: _react2.default.createElement(
          _ListSubheader2.default,
          null,
          '\u901A\u77E5'
        ) },
      _react2.default.createElement(
        _ListItem2.default,
        null,
        _react2.default.createElement(_ListItemText2.default, {
          primary: '\u63A5\u53D7\u6D88\u606F\u63A8\u9001',
          secondary: '\u5F00\u542F\u4E5F\u6CA1\u6709\u7528\uFF0C\u8FD9\u529F\u80FD\u538B\u6839\u6CA1\u505A'
        }),
        _react2.default.createElement(
          _ListItemSecondaryAction2.default,
          null,
          _react2.default.createElement(_Switch2.default, { checked: false })
        )
      )
    ),
    _react2.default.createElement(
      _List2.default,
      { subheader: _react2.default.createElement(
          _ListSubheader2.default,
          null,
          '\u4E3B\u9898'
        ) },
      _react2.default.createElement(
        _ListItem2.default,
        null,
        _react2.default.createElement(_ListItemText2.default, {
          primary: '\u591C\u95F4\u6A21\u5F0F',
          secondary: '\u5F00\u542F\u4E5F\u6CA1\u6709\u7528\uFF0C\u8FD9\u529F\u80FD\u538B\u6839\u6CA1\u505A'
        }),
        _react2.default.createElement(
          _ListItemSecondaryAction2.default,
          null,
          _react2.default.createElement(_Switch2.default, { checked: false })
        )
      )
    ),
    _react2.default.createElement(
      _List2.default,
      { subheader: _react2.default.createElement(
          _ListSubheader2.default,
          null,
          '\u8BDD\u9898'
        ) },
      _react2.default.createElement(
        _ListItem2.default,
        null,
        _react2.default.createElement(_ListItemText2.default, {
          primary: '\u4FDD\u5B58\u8349\u7A3F',
          secondary: '\u5F00\u542F\u4E5F\u6CA1\u6709\u7528\uFF0C\u8FD9\u529F\u80FD\u538B\u6839\u6CA1\u505A'
        }),
        _react2.default.createElement(
          _ListItemSecondaryAction2.default,
          null,
          _react2.default.createElement(_Switch2.default, { checked: false })
        )
      )
    )
  );
};

exports.default = (0, _styles.withStyles)(styles)(Setting);