import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

class NormalRouter extends PureComponent {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        exact: PropTypes.bool,
        path: PropTypes.string,
        component: PropTypes.func
      })
    )
  };

  static defaultProps = {
    routes: []
  };

  render() {
    const { routes } = this.props;
    return (
      <Switch>
        {routes.map(({ component: Component, ...route }) => (
          <Route
            key={route.path}
            {...route}
            render={routeProps => <Component {...routeProps} visible />}
          />
        ))}
      </Switch>
    );
  }
}

export default NormalRouter;
