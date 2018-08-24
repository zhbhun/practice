import React from 'react';
import { Topic } from 'cnodejs.react-material';
import TopicDetailContainer from '../containers/TopicDetailContainer';
import TopicReplyButton from '../containers/TopicReplyButton';

const components = {
  TopicDetail: TopicDetailContainer,
  TopicReplyButton
};

export default props => <Topic {...props} components={components} />;
