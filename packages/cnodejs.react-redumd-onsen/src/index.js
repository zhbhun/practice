import React from 'react';
import ReactDOM from 'react-dom';
import { init } from 'redumd';
import { Provider } from 'react-redux';
import 'react-virtualized/styles.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = init({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  // serviceWorker.unregister();
  serviceWorker.register();
}
