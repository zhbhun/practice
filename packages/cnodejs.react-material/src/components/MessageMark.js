import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DoneAll from '@material-ui/icons/DoneAll';

export default ({ onClick }) => (
  <IconButton color="inherit" onClick={onClick}>
    <DoneAll />
  </IconButton>
);
