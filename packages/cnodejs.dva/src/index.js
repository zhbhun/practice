import React from 'react';
import dva from 'dva';
import { Router, Route } from 'dva/router';
import { createBrowserHistory as createHistory } from 'history';
import { StackRouter } from 'cnodejs.react-material';
import registerServiceWorker from './registerServiceWorker';
import models, { reducers } from './models';
import routes from './routes';

const app = dva({
  history: createHistory(),
  extraReducers: reducers
});
models.forEach(model => app.model(model));
app.router(({ history }) => (
  <Router history={history}>
    <Route render={props => <StackRouter {...props} routes={routes} />} />
  </Router>
));
app.start('#root');
registerServiceWorker();
