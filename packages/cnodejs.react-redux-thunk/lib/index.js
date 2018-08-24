'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _history = require('history');

var _reactRouterDom = require('react-router-dom');

var _connectedReactRouter = require('connected-react-router');

var _AppContainer = require('./containers/AppContainer');

var _AppContainer2 = _interopRequireDefault(_AppContainer);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.routes = _routes2.default;

exports.default = function (Root) {
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  var history = (0, _history.createBrowserHistory)();
  var store = (0, _redux.createStore)((0, _connectedReactRouter.connectRouter)(history)(_reducers2.default), // new root reducer with router state
  composeEnhancers((0, _redux.applyMiddleware)((0, _connectedReactRouter.routerMiddleware)(history), // for dispatching history actions
  _reduxThunk2.default
  // ... other middlewares ...
  )));

  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _AppContainer2.default,
      null,
      _react2.default.createElement(
        _connectedReactRouter.ConnectedRouter,
        { history: history },
        _react2.default.createElement(_reactRouterDom.Route, { component: Root })
      )
    )
  ), document.getElementById('root'));
};