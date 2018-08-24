import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackButton from './BackButton';

const styles = {
  toolbarTitle: {
    flexGrow: 1
  }
};

const Message = ({
  classes,
  match,
  components: { MessagMark, MessageList }
}) => (
  <div>
    <AppBar position="sticky">
      <Toolbar>
        <BackButton />
        <Typography
          variant="title"
          color="inherit"
          className={classes.toolbarTitle}
        >
          消息
        </Typography>
        <MessagMark />
      </Toolbar>
    </AppBar>
    <MessageList />
  </div>
);

Message.propTypes = {
  components: PropTypes.shape({
    MessagMark: PropTypes.func,
    MessageList: PropTypes.func
  })
};

export default withStyles(styles)(Message);
