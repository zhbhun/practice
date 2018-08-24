import React from 'react';
import UserDetailContainer from '../containers/UserDetailContainer';

const User = ({ match, ...props }) => (
  <UserDetailContainer {...props} id={match.params.id} />
);

export default User;
