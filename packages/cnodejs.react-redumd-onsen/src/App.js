import React, { PureComponent } from 'react';
import { Navigator } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Home from './pages/Home';
import Topic from './pages/Topic';

const INITIAL_ROUTE = { path: '/' };

class App extends PureComponent {
  handleClick = () => {};

  renderPage = ({ path, passProps = {} }, navigator) => {
    if (path === '/') {
      return <Home {...passProps} key={path} navigator={navigator} />;
    } else if (path === '/topic') {
      return <Topic {...passProps} key={path} navigator={navigator} />;
    }
    return null;
  };

  render() {
    return (
      <Navigator renderPage={this.renderPage} initialRoute={INITIAL_ROUTE} />
    );
  }
}

export default App;
