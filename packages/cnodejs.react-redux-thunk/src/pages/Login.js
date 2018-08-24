import React from 'react';
import { Login } from 'cnodejs.react-material';
import LoginFormContainer from '../containers/LoginFormContainer';

const components = {
  LoginForm: LoginFormContainer
};

export default props => <Login {...props} components={components} />;
