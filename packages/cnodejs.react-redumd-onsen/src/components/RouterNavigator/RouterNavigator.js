import url from 'url';
import PropTypes from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import { Navigator } from 'react-onsenui';
import { createHashHistory } from 'history';
import matchPath from './matchPath';

const history = createHashHistory();
const getRouteIndex = location => {
  const { query } = url.parse(location.search, true);
  return Number((query && query._) || '0');
};
const getCurrRouteIndex = () => getRouteIndex(history.location);
const getNextRouteIndex = () => getCurrRouteIndex() + 1;
const getInitialRouteStack = rootRoute => {
  if (history.location.pathname !== rootRoute) {
    return [
      { path: '/' }, // 后退时可能和浏览器地址不匹配
      { path: `${history.location.pathname}${history.location.search}` },
    ];
  }
  return [{ path: `${history.location.pathname}${history.location.search}` }];
};

class RouterNavigator extends PureComponent {
  static propTypes = {
    root: PropTypes.string, // 根路由地址
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
      })
    ).isRequired,
  };

  static defaultProps = {
    root: '/',
  };

  constructor(props) {
    super(props);

    this.navigator = createRef();
    this.lastLocation = history.location;
    this.initialRouteStack = getInitialRouteStack(props.root);
  }

  componentDidMount() {
    window.a = this.navigator.current;
    this.unlisten = history.listen(this.handleHistoryChange);
  }

  componentWillUnmount() {
    if (typeof this.unlisten === 'function') {
      this.unlisten();
    }
  }

  popPage = options => {
    history.goBack();
  };

  pushPage = (path, options) => {
    const nextIndex = getNextRouteIndex();
    let nextURL;
    if (path.indexOf('?') >= 0) {
      nextURL = `${path}&_=${nextIndex}`;
    } else {
      nextURL = `${path}?_=${nextIndex}`;
    }
    this.navigator.current.pushPage({ path: nextURL }, options);
    history.push(nextURL);
  };

  resetPage = (path, options) => {
    const replaceIndex = getCurrRouteIndex();
    let replaceURl;
    if (path.indexOf('?') >= 0) {
      replaceURl = `${path}&_=${replaceIndex}`;
    } else {
      replaceURl = `${path}?_=${replaceIndex}`;
    }
    if (
      replaceURl !== `${history.location.pathname}${history.location.search}`
    ) {
      this.navigator.current.resetPage({ path: replaceURl }, options);
      history.replace(replaceURl);
    }
  };

  handleHistoryChange = (location, action) => {
    if (action === 'POP') {
      const lastIndex = getRouteIndex(this.lastLocation);
      const popIndex = getRouteIndex(location);
      const route = { path: `${location.pathname}${location.search}` };
      if (popIndex > lastIndex) {
        this.navigator.current.pushPage(route);
      } else if (
        popIndex < lastIndex &&
        this.navigator.current.pages.length > 1
      ) {
        this.navigator.current.popPage();
      }
    }
    this.lastLocation = location;
  };

  renderPage = ({ path }, navigator) => {
    const { routes } = this.props;
    const onlyPath = path.replace(/\?.*$/gi, '');
    let match = null;
    let Component = null;
    routes.some(route => {
      const routeMathch = matchPath(onlyPath, route);
      if (routeMathch) {
        match = routeMathch;
        Component = route.component;
        return true;
      }
      return false;
    });
    if (Component) {
      const { query } = url.parse(path, true);
      match.query = query;
      return (
        <Component
          key={path}
          index={match._ || 0}
          history={history}
          location={history.location}
          match={match}
          navigator={this}
        />
      );
    }
    return null; // TODO 404
  };

  render() {
    const { routes, initialRoute, ...props } = this.props;
    return (
      <Navigator
        {...props}
        ref={this.navigator}
        initialRouteStack={this.initialRouteStack}
        renderPage={this.renderPage}
      />
    );
  }
}

export default RouterNavigator;
