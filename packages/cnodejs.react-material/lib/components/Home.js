'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require('@material-ui/icons/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  container: {},
  contentContainer: {},
  headerTitle: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawerHeader: {
    height: 134,
    padding: 16
  },
  hidden: {
    display: 'none'
  }
};

var Home = function (_PureComponent) {
  _inherits(Home, _PureComponent);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.openDrawer = function () {
      return _this.setState({ drawerOpen: true });
    };

    _this.closeDrawer = function () {
      return _this.setState({ drawerOpen: false });
    };

    _this.state = {
      drawerOpen: false
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          location = _props.location,
          visible = _props.visible,
          _props$components = _props.components,
          MainDrawer = _props$components.MainDrawer,
          TopicList = _props$components.TopicList,
          TopicEditButton = _props$components.TopicEditButton;
      var drawerOpen = this.state.drawerOpen;

      var query = _queryString2.default.parse(location.search);
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
              _react2.default.createElement(
                _IconButton2.default,
                {
                  className: classes.menuButton,
                  color: 'inherit',
                  'aria-label': 'Menu',
                  onClick: this.openDrawer
                },
                _react2.default.createElement(_Menu2.default, null)
              ),
              _react2.default.createElement(
                _Typography2.default,
                {
                  variant: 'title',
                  color: 'inherit',
                  className: classes.headerTitle
                },
                'CNode\u793E\u533A'
              )
            )
          ),
          _react2.default.createElement(TopicList, { tab: query.tab || 'all' }),
          _react2.default.createElement(MainDrawer, {
            visible: visible,
            open: drawerOpen,
            onOpen: this.openDrawer,
            onClose: this.closeDrawer
          })
        ),
        _react2.default.createElement(TopicEditButton, null)
      );
    }
  }]);

  return Home;
}(_react.PureComponent);

Home.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  components: _propTypes2.default.shape({
    MainDrawer: _propTypes2.default.func,
    TopicList: _propTypes2.default.func,
    TopicEditButton: _propTypes2.default.func
  })
};
exports.default = (0, _styles.withStyles)(styles)(Home);