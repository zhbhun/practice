import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

const styles = {
  replyButton: {
    position: 'fixed',
    bottom: 16,
    right: 16
  }
};

export default withStyles(styles)(({ classes, onToast }) => (
  <Button
    className={classes.replyButton}
    variant="fab"
    color="primary"
    onClick={() => onToast('暂时不支持评论')}
  >
    <ReplyIcon />
  </Button>
));
