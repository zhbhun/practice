'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dayjs = require('dayjs');

var _dayjs2 = _interopRequireDefault(_dayjs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardHeader = require('@material-ui/core/CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _htmlToText = require('../utils/htmlToText');

var _htmlToText2 = _interopRequireDefault(_htmlToText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {
    marginBottom: 10,
    borderRadius: 0
  },
  title: {
    marginBottom: 10
  },
  content: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    whiteSpace: 'normal'
  }
};

var TopicItem = function TopicItem(_ref) {
  var classes = _ref.classes,
      data = _ref.data,
      onClick = _ref.onClick,
      UserAvatar = _ref.components.UserAvatar;
  return _react2.default.createElement(
    _Card2.default,
    { className: classes.container, onClick: onClick },
    _react2.default.createElement(_CardHeader2.default, {
      avatar: _react2.default.createElement(UserAvatar, { id: data.author }),
      title: data.author,
      subheader: (0, _dayjs2.default)(data.create_at).format('YYYY-MM-DD HH:mm:ss')
    }),
    _react2.default.createElement(
      _CardContent2.default,
      null,
      _react2.default.createElement(
        _Typography2.default,
        { className: classes.title, variant: 'title' },
        data.title
      ),
      _react2.default.createElement(
        _Typography2.default,
        {
          className: classes.content,
          color: 'textSecondary',
          component: 'p'
        },
        (0, _htmlToText2.default)(data.content)
      )
    )
  );
};

TopicItem.propTypes = {
  id: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.object.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    UserAvatar: _propTypes2.default.func
  }).isRequired
};

exports.default = (0, _styles.withStyles)(styles)(TopicItem);