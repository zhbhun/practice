import React from 'react';
import PropTypes from 'prop-types';
import { Children, Fragment, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = {
  snackbar: {
    left: '50%',
    right: 'auto',
    bottom: 100,
    width: '50%',
    transform: 'translateX(-50%)'
  },
  snackbarContent: {
    justifyContent: 'center'
  }
};

class App extends PureComponent {
  static propTypes = {
    toast: PropTypes.string,
    onLoad: PropTypes.func.isRequired,
    onCloseToast: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { classes, toast, onCloseToast } = this.props;
    return (
      <Fragment>
        {Children.only(this.props.children)}
        <Snackbar
          className={classes.snackbar}
          autoHideDuration={2000}
          open={!!toast}
          onClose={onCloseToast}
          TransitionComponent={Fade}
        >
          <SnackbarContent
            className={classes.snackbarContent}
            message={toast}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
