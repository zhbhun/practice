import React from 'react';
import { ScrollContext } from 'react-router-scroll-4';
import setup, { routes } from 'cnodejs.react-redux-thunk';
import { NormalRouter } from 'cnodejs.react-material';
import registerServiceWorker from './registerServiceWorker';

setup(props => (
  <ScrollContext>
    <NormalRouter {...props} routes={routes} />
  </ScrollContext>
));
registerServiceWorker();
