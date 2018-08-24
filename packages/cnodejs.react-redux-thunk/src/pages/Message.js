import React from 'react';
import { Message } from 'cnodejs.react-material';
import MessagMark from '../containers/MessagMark';
import MessageListContainer from '../containers/MessageListContainer';

const components = {
  MessagMark,
  MessageList: MessageListContainer
};

export default props => <Message {...props} components={components} />;
