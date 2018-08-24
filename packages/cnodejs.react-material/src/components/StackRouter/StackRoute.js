import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';

const styles = {
  container: {
    display: 'none',
    position: 'fixed',
    zIndex: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch'
  },
  activeContainer: {
    display: 'block'
  }
};

const StackRoute = ({ classes, active, component: Component, ...props }) => (
  <div
    className={classNames(classes.container, {
      [classes.activeContainer]: active
    })}
  >
    <Route
      {...props}
      render={routeProps => <Component {...routeProps} visible={active} />}
    />
  </div>
);

export default withStyles(styles)(StackRoute);
