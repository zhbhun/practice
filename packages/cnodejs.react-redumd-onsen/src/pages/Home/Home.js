import classNames from 'classnames';
import React, { PureComponent } from 'react';
import {
  Card,
  Icon,
  List,
  Page,
  PullHook,
  Toolbar,
  ToolbarButton,
} from 'react-onsenui';
import createPage from '../../utils/createPage';
import htmlToText from '../../utils/htmlToText';
import TopicFeeds from '../../models/TopicFeeds';
import classes from './Home.module.scss';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pullHookState: 'initial',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refreshing && !this.props.refreshing) {
      this.setState({ pullHookState: 'initial' });
      if (this.refreshDone) {
        this.refreshDone();
        this.refreshDone = null;
      }
    }
    if (prevProps.moreLoading && !this.props.moreLoading) {
      if (this.loadMoreDone) {
        this.loadMoreDone();
        this.loadMoreDone = null;
      }
    }
  }

  onPullHookChange = ({ state }) => {
    this.setState({ pullHookState: state });
  };

  onRefresh = done => {
    this.refreshDone = done;
    this.props.onRefresh();
  };

  onLoadMore = done => {
    this.loadMoreDone = done;
    this.props.onLoadMore();
  };

  renderTopic = (topic, index) => {
    return (
      <Card
        key={topic.id}
        onClick={() =>
          this.props.navigator.pushPage({
            path: '/topic',
            passProps: { id: topic.id },
          })
        }
      >
        <div className="title">{topic.title}</div>
        <div className={classNames('content', classes.topicFeedsItemContent)}>
          {htmlToText(topic.content)}
        </div>
      </Card>
    );
  };

  render() {
    const { topics } = this.props;
    const { pullHookState } = this.state;
    return (
      <Page
        renderToolbar={() => (
          <Toolbar>
            <div className="left">
              <ToolbarButton>
                <Icon icon="md-menu" />
              </ToolbarButton>
            </div>
            <div className="center">CNode 社区</div>
          </Toolbar>
        )}
        onInfiniteScroll={this.onLoadMore}
      >
        <PullHook onChange={this.onPullHookChange} onLoad={this.onRefresh}>
          {pullHookState === 'initial' ? (
            <span>
              <Icon size={35} spin={false} icon="ion-arrow-down-a" />
              <span>下拉刷新</span>
            </span>
          ) : pullHookState === 'preaction' ? (
            <span>
              <Icon size={35} spin={false} icon="ion-arrow-up-a" />
              <span>松开刷新</span>
            </span>
          ) : (
            <span>
              <Icon size={35} spin icon="ion-load-d" />
              <span>加载中...</span>
            </span>
          )}
        </PullHook>
        <List dataSource={topics || []} renderRow={this.renderTopic} />
      </Page>
    );
  }
}

export default createPage({
  models: {
    topicFeeds: TopicFeeds,
  },
  getInitialProps: ({ store, models: { topicFeeds } }) => {
    store.dispatch(topicFeeds.actions.initiateIfNeed());
  },
  mapStateToProps: (state, { models: { topicFeeds } }) => {
    const initiate = topicFeeds.getInitiate(state);
    const loadMore = topicFeeds.getLoadMore(state);
    return {
      topics: topicFeeds.getTopics(state),
      hasMore: topicFeeds.hasMore(state),
      moreLoadError: loadMore.error,
      moreLoading: loadMore.loading,
      refreshError: initiate.error,
      refreshing: initiate.loading,
    };
  },
  mapDispatchToProps: (dispatch, { models: { topicFeeds } }) => ({
    onRefresh: () => dispatch(topicFeeds.actions.initiate()),
    onLoadMore: () => dispatch(topicFeeds.actions.loadMore()),
  }),
})(Home);
