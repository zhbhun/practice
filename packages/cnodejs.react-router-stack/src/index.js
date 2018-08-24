import React from 'react';
import setup, { routes } from 'cnodejs.react-redux-thunk';
import { StackRouter } from 'cnodejs.react-material';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

setup(props => <StackRouter {...props} routes={routes} />);
registerServiceWorker();
