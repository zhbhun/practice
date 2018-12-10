import React from 'react';
import { Home } from 'cnodejs.react-material';
import MainDrawerContainer from '../containers/MainDrawerContainer';
import TopicListContainer from '../containers/TopicListContainer';
import TopicEditButton from '../containers/TopicEditButton';

const components = {
  MainDrawer: MainDrawerContainer,
  TopicList: TopicListContainer,
  TopicEditButton
};

export default props => <Home {...props} components={components} />;
