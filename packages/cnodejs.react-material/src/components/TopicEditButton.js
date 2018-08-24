import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  editButton: {
    position: 'fixed',
    bottom: 16,
    right: 16
  }
};

export default withStyles(styles)(({ classes, onToast }) => (
  <Button
    className={classes.editButton}
    variant="fab"
    color="primary"
    onClick={() => onToast('暂时不支持发帖')}
  >
    <EditIcon />
  </Button>
));
