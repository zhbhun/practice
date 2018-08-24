import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import MoreLoader from './MoreLoader';
import PullToRefresh from './PullToRefresh';

class TopicList extends PureComponent {
  componentDidMount() {
    this.props.onInit();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tab !== this.props.tab) {
      this.props.onInit();
    }
  }

  render() {
    const {
      error,
      loading,
      hasMore,
      topics,
      onLoadMore,
      onRefresh,
      components: { TopicItem }
    } = this.props;
    return (
      <PullToRefresh onRefresh={onRefresh} refreshing={loading}>
        {topics && topics.length > 0 ? (
          <Fragment>
            {(topics || []).map(id => (
              <TopicItem key={id} id={id} />
            ))}
            <MoreLoader
              hasMore={hasMore}
              loading={loading}
              error={error}
              onLoad={onLoadMore}
            />
          </Fragment>
        ) : null}
      </PullToRefresh>
    );
  }
}

TopicList.propTypes = {
  tab: PropTypes.string.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  topics: PropTypes.array,
  onInit: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  components: PropTypes.shape({
    TopicItem: PropTypes.func
  }).isRequired
};

TopicList.defaultProps = {
  topics: null
};

export default TopicList;
