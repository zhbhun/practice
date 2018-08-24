'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _BackButton = require('./BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {},
  contentContainer: {},
  appBarTitle: {
    flexGrow: 1
  }
};

var Topic = function Topic(_ref) {
  var classes = _ref.classes,
      match = _ref.match,
      _ref$components = _ref.components,
      TopicDetail = _ref$components.TopicDetail,
      TopicReplyButton = _ref$components.TopicReplyButton;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('page', classes.container) },
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('page-container', classes.contentContainer) },
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
              className: classes.appBarTitle
            },
            '\u8BDD\u9898'
          )
        )
      ),
      _react2.default.createElement(TopicDetail, { id: match.params.id })
    ),
    _react2.default.createElement(TopicReplyButton, null)
  );
};

Topic.propTypes = {
  components: _propTypes2.default.shape({
    TopicDetail: _propTypes2.default.func,
    TopicReplyButton: _propTypes2.default.func
  }).isRequired
};

exports.default = (0, _styles.withStyles)(styles)(Topic);