import React from 'react';
import { StackRouter } from 'cnodejs.react-material'
// import AppContainer from './containers/AppContainer';
// import routes from './routes';

export default (props) => (
  <AppContainer>
    <StackRouter {...props} routes={routes} />
  </AppContainer>
);
