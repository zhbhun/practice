import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { matchPath } from 'react-router-dom';
import StackRoute from './StackRoute';

const createRoutes = routes => routes.map(route => <StackRoute {...route} />);

class StackRouter extends PureComponent {
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

  constructor(props) {
    super(props);

    props.location.state = Object.assign({}, props.location.state, {
      root: true
    });
    this.setRouteTime(props.location.key);

    this.routes = createRoutes(props.routes);
    this.routeTimes = null;
    this.state = {
      routeStack: [this.findFirstMatch(props.location)]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.setRouteTime(nextProps.location.key);
      switch (nextProps.history.action) {
        case 'REPLACE': {
          const currentIndex = this.getCurrentRouteIndex();
          const matchRoute = this.findFirstMatch(nextProps.location);
          const newRouteStack = this.state.routeStack.map(route =>
            React.cloneElement(route, { active: false })
          );
          newRouteStack.splice(currentIndex, 1, matchRoute);
          this.setState({ routeStack: newRouteStack });
          break;
        }
        case 'PUSH': {
          const currentIndex = this.getCurrentRouteIndex();
          const matchRoute = this.findFirstMatch(nextProps.location);
          const newRouteStack = this.state.routeStack
            .slice(0, currentIndex + 1)
            .map(route => React.cloneElement(route, { active: false }));
          newRouteStack.push(matchRoute);
          this.setState({ routeStack: newRouteStack });
          break;
        }
        case 'POP': {
          let nextIndex = -1;
          const newRouteStack = this.state.routeStack.map((route, index) => {
            const matched = route.props.id === nextProps.location.key;
            if (matched) {
              nextIndex = index;
            }
            return React.cloneElement(route, { active: matched });
          });
          if (nextIndex < 0) {
            const matchRoute = this.findFirstMatch(nextProps.location);
            const nextRouteTime = this.getRouteTime(nextProps.location.key);
            const currentRouteTime = this.getRouteTime(this.props.location.key);
            if (nextRouteTime < currentRouteTime) {
              newRouteStack.unshift(matchRoute);
            } else {
              newRouteStack.push(matchRoute);
            }
          }
          this.setState({ routeStack: newRouteStack });
          break;
        }
        default:
          break;
      }
    }
  }

  findFirstMatch = (location) => {
    let match, mathRoute;
    this.routes.forEach(route => {
      if (!React.isValidElement(route)) return;

      const { path: pathProp, exact, strict, sensitive, from } = route.props;
      const path = pathProp || from;

      if (match == null) {
        mathRoute = route;
        match = matchPath(location.pathname, { path, exact, strict, sensitive });
      }
    });
    return match
      ? React.cloneElement(mathRoute, {
          key: location.key || 'root',
          id: location.key,
          active: true,
          location
        })
      : null; // TODO 404
  };

  setRouteTime = (key = 'root') => {
    if (!this.getRouteTime(key)) {
      this.routeTimes[key] = Date.now();
      sessionStorage.setItem('routes', JSON.stringify(this.routeTimes));
    }
  };

  getRouteTime = (key = 'root') => {
    if (!this.routeTimes) {
      const cache = sessionStorage.getItem('routes');
      this.routeTimes = !cache ? {} : JSON.parse(cache);
    }
    return this.routeTimes[key];
  };

  getCurrentRouteIndex = () => {
    let currentIndex = -1;
    this.state.routeStack.some((route, index) => {
      if (route.props.id === this.props.location.key) {
        currentIndex = index;
        return true;
      }
      return false;
    });
    return currentIndex;
  };

  render() {
    return <Fragment>{this.state.routeStack}</Fragment>;
  }
}

export default StackRouter;
