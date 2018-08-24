'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _CardActions = require('@material-ui/core/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _CardHeader = require('@material-ui/core/CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ThumbUp = require('@material-ui/icons/ThumbUp');

var _ThumbUp2 = _interopRequireDefault(_ThumbUp);

var _Reply = require('@material-ui/icons/Reply');

var _Reply2 = _interopRequireDefault(_Reply);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _timeago = require('../utils/timeago');

var _timeago2 = _interopRequireDefault(_timeago);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  contentText: {}
};

var ReplyItem = function ReplyItem(_ref) {
  var classes = _ref.classes,
      data = _ref.data,
      onToast = _ref.onToast,
      onLike = _ref.onLike,
      _ref$components = _ref.components,
      LoginConfirm = _ref$components.LoginConfirm,
      UserAvatar = _ref$components.UserAvatar;
  return _react2.default.createElement(
    'div',
    { id: data.id },
    _react2.default.createElement(_Divider2.default, null),
    _react2.default.createElement(_CardHeader2.default, {
      avatar: _react2.default.createElement(UserAvatar, { id: data.author }),
      title: data.author,
      subheader: (0, _timeago2.default)(data.create_at),
      action: _react2.default.createElement(
        _CardActions2.default,
        null,
        _react2.default.createElement(
          LoginConfirm,
          { onClick: onLike },
          _react2.default.createElement(
            _IconButton2.default,
            { color: data.is_uped ? 'primary' : undefined },
            _react2.default.createElement(_ThumbUp2.default, null)
          )
        ),
        _react2.default.createElement(
          LoginConfirm,
          { onClick: function onClick() {
              return onToast('暂时不支持回复评论');
            } },
          _react2.default.createElement(
            _IconButton2.default,
            null,
            _react2.default.createElement(_Reply2.default, null)
          )
        )
      )
    }),
    _react2.default.createElement(
      _CardContent2.default,
      null,
      _react2.default.createElement(_Typography2.default, {
        component: 'p',
        dangerouslySetInnerHTML: { __html: data.content }
      })
    )
  );
};

ReplyItem.propTypes = {
  id: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.object.isRequired,
  onToast: _propTypes2.default.func.isRequired,
  onLike: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    LoginConfirm: _propTypes2.default.func,
    UserAvatar: _propTypes2.default.func
  }).isRequired
};

exports.default = (0, _styles.withStyles)(styles)(ReplyItem);