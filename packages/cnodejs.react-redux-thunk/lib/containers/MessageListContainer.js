'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _message = require('../actions/message');

var messageActions = _interopRequireWildcard(_message);

var _message2 = require('../selectors/message');

var messageSelectors = _interopRequireWildcard(_message2);

var _MessageItemContainer = require('./MessageItemContainer');

var _MessageItemContainer2 = _interopRequireDefault(_MessageItemContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var components = {
  MessageItem: _MessageItemContainer2.default
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: messageSelectors.isLoading(state),
    messages: messageSelectors.getData(state),
    components: components
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var tab = _ref.tab;
  return {
    onInit: function onInit() {
      return dispatch(messageActions.loadIfNeed());
    },
    onRefresh: function onRefresh() {
      return dispatch(messageActions.refresh());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.MessageList);