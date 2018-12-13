import React, { PureComponent } from 'react';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import RouterNavigator from './components/RouterNavigator';
import Home from './pages/Home';
import Topic from './pages/Topic';

const ROUTES = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/topic/:id',
    component: Topic,
  },
];

class App extends PureComponent {
  render() {
    return <RouterNavigator routes={ROUTES} />;
  }
}

export default App;
