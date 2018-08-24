import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const BackButton = ({ classes, color = 'inherit', location, history }) => (
  <IconButton
    className={classes.menuButton}
    color={color}
    aria-label="back"
    onClick={() => {
      if (location.state && location.state.root) {
        history.replace('/');
      } else {
        history.goBack();
      }
    }}
  >
    <ArrowBack />
  </IconButton>
);

export default withRouter(withStyles(styles)(BackButton));
