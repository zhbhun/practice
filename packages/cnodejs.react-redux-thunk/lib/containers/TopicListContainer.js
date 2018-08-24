'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _topic = require('../actions/topic');

var topicActions = _interopRequireWildcard(_topic);

var _topic2 = require('../selectors/topic');

var topicSelectors = _interopRequireWildcard(_topic2);

var _TopicItemContainer = require('./TopicItemContainer');

var _TopicItemContainer2 = _interopRequireDefault(_TopicItemContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var components = {
  TopicItem: _TopicItemContainer2.default
};
var mapStateToProps = function mapStateToProps(state, _ref) {
  var tab = _ref.tab;
  return {
    error: topicSelectors.getListError(state, tab),
    loading: topicSelectors.isListLoading(state, tab),
    hasMore: topicSelectors.hasListMore(state, tab),
    topics: topicSelectors.getListData(state, tab),
    components: components
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var tab = _ref2.tab;
  return {
    onInit: function onInit() {
      return dispatch(topicActions.loadListIfNeed(tab));
    },
    onRefresh: function onRefresh() {
      return dispatch(topicActions.refreshList(tab));
    },
    onLoadMore: function onLoadMore() {
      return dispatch(topicActions.loadListMore(tab));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.TopicList);