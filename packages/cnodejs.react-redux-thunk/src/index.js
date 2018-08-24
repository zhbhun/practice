import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { Route } from 'react-router-dom';
import {
  connectRouter,
  ConnectedRouter,
  routerMiddleware
} from 'connected-react-router';
import AppContainer from './containers/AppContainer';
import rootReducer from './reducers';
import routes from './routes';

export { routes };

export default (Root) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const history = createHistory();
  const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk
        // ... other middlewares ...
      )
    )
  );

  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <Route component={Root} />
        </ConnectedRouter>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};
