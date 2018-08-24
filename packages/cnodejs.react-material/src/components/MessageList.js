import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import PullToRefresh from './PullToRefresh';

class MessageList extends PureComponent {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    const {
      loading,
      messages,
      onRefresh,
      components: { MessageItem }
    } = this.props;
    return (
      <PullToRefresh onRefresh={onRefresh} refreshing={loading}>
        {messages && messages.length > 0 ? (
          <Fragment>
            {(messages || []).map(id => (
              <MessageItem key={id} id={id} />
            ))}
          </Fragment>
        ) : null}
      </PullToRefresh>
    );
  }
}

MessageList.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array,
  onInit: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  components: PropTypes.shape({
    MessageItem: PropTypes.func
  }).isRequired
};

MessageList.defaultProps = {
  messages: null
};

export default MessageList;
